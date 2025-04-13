import { Attendance, validateAttendance, validateAttendanceUpdate } from "../models/Attendance.js";
import { User } from "../models/User.js";

// Create new attendance (Check-in)
export const markCheckIn = async (req, res) => {
  const { error } = validateAttendance(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { userId, checkIn, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if attendance already exists for this user and date
    const existing = await Attendance.findOne({ userId, date });
    if (existing) return res.status(400).json({ message: "Attendance already marked for this date" });

    const attendance = new Attendance({ userId, checkIn, date });
    await attendance.save();

    res.status(201).json({ message: "Check-in marked successfully", data: attendance });
  } catch (err) {
    res.status(500).json({ message: "Error marking attendance", error: err.message });
  }
};

// Update attendance (Check-out)
export const markCheckOut = async (req, res) => {
  const { userId, date, checkOut } = req.body;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { userId, date },
      { checkOut },
      { new: true }
    );

    if (!attendance) return res.status(404).json({ message: "Attendance not found" });

    res.status(200).json({ message: "Check-out marked successfully", data: attendance });
  } catch (err) {
    res.status(500).json({ message: "Error updating check-out", error: err.message });
  }
};

// Get all attendance for a user
export const getUserAttendance = async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await Attendance.find({ userId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance", error: err.message });
  }
};

// Delete an attendance record
export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });

    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete attendance", error: err.message });
  }
};
