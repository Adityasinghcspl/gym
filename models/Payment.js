import mongoose from "mongoose";
import Joi from "joi";

const paymentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  method: { type: String, enum: ['Cash', 'Card', 'UPI'], required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
}, {
  timestamps: true,
  versionKey: false
});

const Payment = mongoose.model("Payment", paymentSchema);

const validatePayment = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    method: Joi.string().valid('Cash', 'Card', 'UPI').required(),
    status: Joi.string().valid('Pending', 'Completed', 'Failed').optional()
  });
  return schema.validate(data);
};

const validatePaymentUpdate = (data) => {
  const schema = Joi.object({
    amount: Joi.number().optional(),
    method: Joi.string().valid('Cash', 'Card', 'UPI').optional(),
    status: Joi.string().valid('Pending', 'Completed', 'Failed').optional(),
    _id: Joi.any().strip(),
    userId: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip()
  });
  return schema.validate(data);
};

export { Payment, validatePayment, validatePaymentUpdate };
