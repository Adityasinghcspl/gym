import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Trainer, validateTrainer, validateTrainerUpdate } from '../models/trainerModel.js';
import CryptoJS from "crypto-js";
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import Joi from "joi";

//@desc Register a trainer
//@route POST /api/trainers/register
//@access public
const registerTrainer = async (req, res) => {
  try {
    const { error } = validateTrainer(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone_no, password, bio } = req.body;
    // Check if trainer already exists
    const trainerAvailable = await Trainer.findOne({ email });
    if (trainerAvailable) {
      res.status(400);
      throw new Error("Trainer already registered!");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await Trainer.create({ name, email, phone_no, password: hashedPassword, role: 'trainer', bio });
    res.status(201).json({ message: 'Trainer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred during registration" });
  }
}

//@desc Get all trainers
//@route POST /api/trainers
//@access private
const getAllTrainers = async (req, res) => {
  try {
    // Fetch all trainers and sort by name
    const trainers = await Trainer.find()
      .sort({ name: 1 })
      .select('_id name email phone_no createdAt updatedAt');
    res.status(200).json(trainers);
  } catch (err) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ message: err.message || "An error occurred while fetching trainers" });
  }
}

//@desc Get single trainer
//@route POST /api/trainers/:id
//@access private
const getTrainer = async (req, res) => {
  const { id } = req.params;
  // Validate the provided id
  if (!id) {
    return res.status(400).json({ message: "trainer ID is required" });
  }
  try {
    // Find trainer by ID
    const trainer = await Trainer.findById(id).exec();
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    // Return the found trainer
    return res.status(200).json(trainer);
  } catch (error) {
    // Handle invalid MongoDB ObjectID or other errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid trainer ID format" });
    }
    // Handle other errors
    return res.status(500).json({ message: "An error occurred while fetching the trainer by trainerID" });
  }
}

//@desc delete single trainer
//@route Delete /api/trainer/:id
//@access private
const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  // Validate the provided id
  if (!id) {
    return res.status(400).json({ message: "trainer ID is required" });
  }
  try {
    // Find and delete the trainer by ID
    const trainer = await Trainer.findByIdAndDelete(id).exec();
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    // Return success response
    return res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    // Handle invalid MongoDB ObjectID or other errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid trainer ID format" });
    }
    // Handle other errors
    return res.status(500).json({ message: "An error occurred while deleting the trainer." });
  }
}


//@desc Login trainer
//@route POST /api/trainers/login
//@access public
const loginTrainer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory!" });
    }
    // Find trainer by email
    const trainer = await Trainer.findOne({ email });
    // Compare password with hashed password
    if (trainer && (await bcrypt.compare(password, trainer.password))) {
      const accessToken = jwt.sign(
        {
          name: trainer.name,
          email: trainer.email,
          id: trainer._id,
          role: trainer.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ message: "Email or Password is not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "An error occurred during login" });
  }
}


//@desc Update trainer data through admin (excluding password)
//@route PATCH /api/trainers/:id
//@access private (admin only)
const updateTrainerByAdmin = async (req, res) => {
  try {
    const { error } = validateTrainerUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTrainer) return res.status(404).json({ message: "Trainer not found." });
    res.status(200).json({ message: "Trainer data updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred while updating trainer data." });
  }
};


//@desc Update trainer password through admin
//@route PATCH /api/trainers/:id/password
//@access private (admin only)
const updateTrainerPasswordByAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Trainer ID
    const { newPassword } = req.body; // New password to be set
    // Validate input
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required." });
    }
    // Fetch the trainer by ID
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }
    // Hash and update the password
    trainer.password = await bcrypt.hash(newPassword, 10);
    // Save updated trainer info
    await trainer.save();
    res.status(200).json({ message: "Trainer password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred while updating trainer password." });
  }
};

//@desc Update trainer password through send the email
//@route POST /api/trainer/password-reset
//@access public
const requestTrainerPasswordReset = async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const trainer = await Trainer.findOne({ email: req.body.email });
    if (!trainer) return res.status(400).json({ message: "Trainer with given email doesn't exist" });

    let token = await Token.findOne({ trainerId: trainer._id });
    if (!token) {
      token = await new Token({
        userId: trainer._id,
        token: CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
      }).save();
    }

    // Use process.env.ADMIN_URL or default to localhost:3000
    const baseUrl = process.env.ADMIN_URL;
    const link = `${baseUrl}/api/trainer/password-reset/${trainer._id}/${token.token}`;

    await sendEmail(trainer.email, "Password Reset", `Click here to reset your password: ${link}`);
    res.status(200).json({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while requesting password reset" });
    console.error(error);
  }
};

//@desc Update trainer password via email url
//@route POST /password-reset/:trainerId/:token
//@access public
const resetTrainerPassword = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    const trainer = await Trainer.findById(req.params.userId);
    if (!trainer) return res.status(400).json({ message: "Invalid link or expired" });
    
    const token = await Token.findOne({ userId: trainer._id, token: req.params.token });
    if (!token) return res.status(400).json({ message: "Invalid link or expired" });

    trainer.password = await bcrypt.hash(req.body.password, 10);
    await trainer.save();
    await token.deleteOne();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while resetting password" });
    console.error(error);
  }
};

export { registerTrainer, loginTrainer, updateTrainerByAdmin, updateTrainerPasswordByAdmin, getTrainer, getAllTrainers, deleteTrainer, requestTrainerPasswordReset, resetTrainerPassword };
