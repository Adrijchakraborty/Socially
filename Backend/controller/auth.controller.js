import Auth from "../models/auth.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/createError.js";

export const signup = async (req, res, next) => {
    try {
        const { password, ...rest } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = new Auth({ password: hashPassword, ...rest });
        await user.save();
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Auth.findOne({ username: username });

        if (!user) return next(createError(404, "User not found"));
        const hashPassword = bcrypt.compareSync(password, user.password);
        if (!hashPassword) return next(createError(404, "Invalid Credentials"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        const { password: pass, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        next(error);
    }
}

