import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, validateUser, validateUserUpdate } from '../models/userModel.js';
import CryptoJS from "crypto-js";
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import Joi from "joi";

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone_no, password, address } = req.body;

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone_no, address, password: hashedPassword, role: 'user' });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred during registration" });
  }
}

//@desc Get all users
//@route POST /api/users
//@access private
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users and sort by name
    const users = await User.find()
      .sort({ name: 1 })
      .select('_id name email phone_no address createdAt updatedAt');
    res.status(200).json(users);
  } catch (err) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ message: err.message || "An error occurred while fetching users" });
  }
}

//@desc Get single user
//@route POST /api/users/:id
//@access public
const getUser = async (req, res) => {
  const { id } = req.params;
  // Validate the provided id
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Find user by ID
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the found user
    return res.status(200).json(user);
  } catch (error) {
    // Handle invalid MongoDB ObjectID or other errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    // Handle other errors
    return res.status(500).json({ message: "An error occurred while fetching the user by userID" });
  }
}


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory!" });
    }
    // Find user by email
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
          role: user.role
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

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = async (req, res) => {
  try {
    // Return the current user information
    return res.status(200).json(req.user);
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: "An error occurred while fetching the current user" });
  }
}

//@desc delete single user
//@route Delete /api/user/:id
//@access private
const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Validate the provided id
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return success response
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle invalid MongoDB ObjectID or other errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid User ID format" });
    }
    // Handle other errors
    return res.status(500).json({ message: "An error occurred while deleting the User." });
  }
}

//@desc Update user data through admin (excluding password)
//@route PATCH /api/user/:id
//@access private (admin only)
const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the user" });
  }
};


//@desc Update user password through admin
//@route PATCH /api/user/:id/password
//@access private (admin only)
const updateUserPasswordByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) return res.status(400).json({ message: "New password is required" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.status(200).json({ message: "User password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating user password" });
  }
};

//@desc Update user password through send the email
//@route POST /api/user/password-reset
//@access public
const requestUserPasswordReset = async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User with given email doesn't exist" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
      }).save();
    }

    // Use process.env.USER_URL or default to localhost:3000
    const baseUrl = process.env.USER_URL;
    const link = `${baseUrl}/api/user/password-reset/${user._id}/${token.token}`;

    await sendEmail(user.email, "Password Reset", `Click here to reset your password: ${link}`);
    res.status(200).json({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while requesting password reset" });
    console.error(error);
  }
};

//@desc Update user password via email url
//@route POST /password-reset/:userId/:token
//@access public
const resetUserPassword = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json({ message: "Invalid link or expired" });

    const token = await Token.findOne({ userId: user._id, token: req.params.token });
    if (!token) return res.status(400).json({ message: "Invalid link or expired" });

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    await token.deleteOne();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while resetting password" });
    console.error(error);
  }
};

export { registerUser, loginUser, currentUser, getUser, getAllUsers, deleteUser, updateUserByAdmin, updateUserPasswordByAdmin, requestUserPasswordReset, resetUserPassword };
