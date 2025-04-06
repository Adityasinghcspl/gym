import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Token expires in 10 minutes (600 seconds)
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;