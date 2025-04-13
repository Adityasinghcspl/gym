import mongoose from "mongoose";
import Joi from "joi";

const workoutSchema = mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  exercises: [{
    name: String,
    duration: String,
    sets: Number,
    reps: Number
  }],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }
}, {
  timestamps: true,
  versionKey: false
});

const Workout = mongoose.model("Workout", workoutSchema);

const validateWorkout = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
    exercises: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().optional(),
      sets: Joi.number().optional(),
      reps: Joi.number().optional()
    })),
    assignedBy: Joi.string().optional()
  });
  return schema.validate(data);
};

const validateWorkoutUpdate = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').optional(),
    exercises: Joi.array().items(Joi.object({
      name: Joi.string().optional(),
      duration: Joi.string().optional(),
      sets: Joi.number().optional(),
      reps: Joi.number().optional()
    })),
    _id: Joi.any().strip(),
    createdAt: Joi.any().strip(),
    updatedAt: Joi.any().strip()
  });
  return schema.validate(data);
};

export { Workout, validateWorkout, validateWorkoutUpdate };
