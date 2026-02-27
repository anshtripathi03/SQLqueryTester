import rateLimit from "express-rate-limit";

export const hintLimiter = rateLimit({
  windowMs: 600 * 1000,
  max: 5,
});