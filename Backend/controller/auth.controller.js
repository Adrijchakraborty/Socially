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
        res.status(201).json(rest);
    } catch (error) {
        if (error.code === 11000) {
            const fieldName = Object.keys(error.keyValue)[0];
            return next(createError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists.`));
        }
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const query = username ? { username: username } : { email: email };
        const user = await Auth.findOne(query);
        //validating the user
        if (!user) return next(createError(404, "User not found"));
        if (!email && username && password) {
            const hashPassword = bcrypt.compareSync(password, user.password);
            if (!hashPassword) return next(createError(404, "Invalid Credentials"));
        }
        else if((!username && password) || (username && !password)) {
            return next(createError(404, "Invalid Credentials"));
        }

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

