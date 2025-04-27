import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    phone_no: {
      type: Number,
      required: [true, "Please add the user Phone Number"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    role: {
      type: String,
      required: [true, "Please set the role"],
      enum: ["user"], // only user role allowed in this collection
    },
    address: {
      type: String,
      default: "",
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
      default: null
    },
    membershipStartDate: {
      type: Date
    },
    membershipEndDate: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

// Joi Validation Schema
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone_no: Joi.number()
      .integer()
      .min(1000000000) // Smallest 10-digit number
      .max(9999999999) // Largest 10-digit number
      .required()
      .messages({
        "number.base": "Phone number must be a number",
        "number.integer": "Phone number must be an integer",
        "number.min": "Phone number must be exactly 10 digits",
        "number.max": "Phone number must be exactly 10 digits",
      }),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user"),
    address: Joi.string().max(100).allow(""), // Optional
  });
  return schema.validate(data);
};

// update user
const validateUserUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone_no: Joi.alternatives([
      Joi.number().integer().min(1000000000).max(9999999999),
      Joi.string().pattern(/^\d{10}$/).message("Phone number must be exactly 10 digits"),
    ]).optional(),
    address: Joi.string().max(100).allow("").optional(), // Optional field
    // ✅ Ignore these fields if they exist, but don't update them
    _id: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip()
  });
  return schema.validate(data);
};

export { User, validateUser, validateUserUpdate };
