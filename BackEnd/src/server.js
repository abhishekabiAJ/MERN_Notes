import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/rateLimiter.js"; // Importing the rate limiting middleware
import cors from "cors"; // Importing CORS middleware
// Importing necessary modules and configurations

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
})); // Apply CORS middleware

app.use(express.json()); // Middleware to parse JSON bodies

app.use(rateLimit); // Apply rate limiting middleware

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use("/api/notes", noteRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1); // Exit the process if database connection fails
  });