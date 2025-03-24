import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
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
    address:{
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema); 
export default User;
