import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/rateLimiter.js"; // Importing the rate limiting middleware
import cors from "cors"; // Importing CORS middleware
import path from "path";
// Importing necessary modules and configurations

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000;
const __dirname = path.resolve()
if (process.env.node_env !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  ); // Apply CORS middleware
}

app.use(express.json()); // Middleware to parse JSON bodies

app.use(rateLimit); // Apply rate limiting middleware

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use("/api/notes", noteRoutes);

if (process.env.node_env === "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../FrontEnd","dist","index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1); // Exit the process if database connection fails
  });
