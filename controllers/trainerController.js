import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Trainer from '../models/trainerModel.js';

//@desc Register a trainer
//@route POST /api/trainers/register
//@access public
const registerTrainer = async (req, res) => {
  try {
    const { name, email, phone_no, password } = req.body;
    // Check for missing fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone_no) missingFields.push("phone_no");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400);
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
    // Check if trainer already exists
    const trainerAvailable = await Trainer.findOne({ email });
    if (trainerAvailable) {
      res.status(400);
      throw new Error("Trainer already registered!");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await Trainer.create({ name, email, phone_no, password: hashedPassword, role: 'trainer' });
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
    return res.status(200).json({ message: "Trainer deleted successfully", trainer });
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

//@desc Current trainer info
//@route GET /api/trainers/current
//@access private
const currentTrainer = async (req, res) => {
  try {
    // Return the current trainer information
    return res.status(200).json(req.trainer);
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: "An error occurred while fetching the current trainer" });
  }
}

export { registerTrainer, loginTrainer, currentTrainer, getTrainer, getAllTrainers, deleteTrainer };
