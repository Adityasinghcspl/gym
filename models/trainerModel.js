import mongoose from "mongoose";

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
      required: [true, "Please set the role"]
    }
  },
  {
    timestamps: true,
  }
);

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;
