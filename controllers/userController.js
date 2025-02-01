import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
  try {
    const { username, email, phone_no, password, address } = req.body;
    // Check for missing fields
    const missingFields = [];
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!phone_no) missingFields.push("phone_no");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400);
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, phone_no, address, password: hashedPassword });
    res.status(201).json(user);
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
    const users = await User.find().sort({ name: 1 });
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
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
            role: 'user'
          },
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

export { registerUser, loginUser, currentUser, getUser, getAllUsers };
