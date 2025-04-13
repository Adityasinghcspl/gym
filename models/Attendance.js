import mongoose from "mongoose";
import Joi from "joi";

const attendanceSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  checkIn: String,
  checkOut: String
}, {
  timestamps: true,
  versionKey: false
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

const validateAttendance = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    checkIn: Joi.string().optional(),
    checkOut: Joi.string().optional()
  });
  return schema.validate(data);
};

const validateAttendanceUpdate = (data) => {
  const schema = Joi.object({
    checkIn: Joi.string().optional(),
    checkOut: Joi.string().optional(),
    _id: Joi.any().strip(),
    userId: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip()
  });
  return schema.validate(data);
};

export { Attendance, validateAttendance, validateAttendanceUpdate };
