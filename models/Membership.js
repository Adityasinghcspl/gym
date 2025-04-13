import mongoose from "mongoose";
import Joi from "joi";

// Mongoose Schema
const membershipSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  durationInMonths: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
});

const Membership = mongoose.model("Membership", membershipSchema);

// Joi Validation
const validateMembership = (data) => {
  const schema = Joi.object({
    type: Joi.string().valid("Monthly", "Quarterly", "Half-Yearly", "Yearly").required(),
    price: Joi.number().min(0).required(),
    durationInMonths: Joi.number().integer().min(1).required(),
    features: Joi.array().items(Joi.string()).optional()
  });
  return schema.validate(data);
};

const validateMembershipUpdate = (data) => {
  const schema = Joi.object({
    type: Joi.string().valid("Monthly", "Quarterly", "Half-Yearly", "Yearly").optional(),
    price: Joi.number().min(0).optional(),
    durationInMonths: Joi.number().integer().min(1).optional(),
    features: Joi.array().items(Joi.string()).optional(),
    _id: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip()
  });
  return schema.validate(data);
};

export { Membership, validateMembership, validateMembershipUpdate };
