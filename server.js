import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerDocs from './doc/swagger.js'
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/userRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import connectDb from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
// Connect to the database
connectDb();
// Create an instance of the Express application
const app = express();
// Define the port for the server to listen on
const port = process.env.PORT || 5000;
// Middleware to parse incoming JSON requests
app.use(express.json());
// Configure CORS to allow specific origins
const allowedOrigins = [ process.env.ADMIN_URL, process.env.USER_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools like curl/postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware to log the endpoint of each request
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
// Set up Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Define the user routes
app.use("/api/user", userRoutes);
// Define the trainer routes
app.use("/api/trainer", trainerRoutes);
// Define the membership routes
app.use("/api/membership", membershipRoutes);
// Define the attendance routes
app.use("/api/attendance", attendanceRoutes);
// Use the error handling middleware
app.use(errorHandler);
// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});