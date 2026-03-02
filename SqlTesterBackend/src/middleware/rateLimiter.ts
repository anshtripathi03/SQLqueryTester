import rateLimit from "express-rate-limit";

export const hintLimiter = rateLimit({
  windowMs: 6 * 1000,
  max: 5,
});