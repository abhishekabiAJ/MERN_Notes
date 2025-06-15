import rateLimit  from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }
    next(); // Proceed to the next middleware or route handler if rate limit is not exceeded
  } catch (error) {
    console.error("Error checking rate limit:", error);
    next(error); // Pass the error to the next middleware for handling
  }
}

export default rateLimiter;