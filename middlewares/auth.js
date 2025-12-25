import { parseToken } from "../utils/jwt.js";

export async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access Token required",
    });
  }
  const token = authHeader.substring(7); // Remove "Bearer "
  try {
    req.user = parseToken(token);
    next();
  } catch (err) {
    res.status(403).json({
      error: "Invalid or expired token",
    });
  }
}
