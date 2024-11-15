import jwt from "jsonwebtoken"
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {
  
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401,'Access Denied: No Token Provided!'));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403,'Access Denied: Invalid Token!'));
    }
    req.user = user; 
    next();
  });
}
