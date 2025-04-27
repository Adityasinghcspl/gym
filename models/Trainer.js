import mongoose from "mongoose";
import Joi from "joi";

const trainerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the trainer name"],
    },
    email: {
      type: String,
      required: [true, "Please add the trainer email address"],
      unique: [true, "Email address already taken"],
    },
    phone_no: {
      type: Number,
      required: [true, "Please add the trainer Phone Number"],
    },
    password: {
      type: String,
      required: [true, "Please add the trainer password"],
    },
    role: {
      type: String,
      enum: ["admin", "trainer"],
      required: [true, "Please set the role"]
    },
    bio: {
      type: String,
      default: "", // Optional field with a default empty value
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

// Joi validation schema
const validateTrainer = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
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
    retype_password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "trainer", "assistant"),
    bio: Joi.string().max(500).allow(""),
  });

  return schema.validate(data);
};

// Joi validation schema for updating trainer information
const validateTrainerUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone_no: Joi.alternatives([
      Joi.number().integer().min(1000000000).max(9999999999),
      Joi.string().pattern(/^\d{10}$/).message("Phone number must be exactly 10 digits"),
    ]).optional(),
    bio: Joi.string().max(500).allow("").optional(),
    // Ignore these fields if they exist, but don't update them
    _id: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip(),
  });
  return schema.validate(data);
};

export { Trainer, validateTrainer, validateTrainerUpdate };
