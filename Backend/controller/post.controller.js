import Post from "../models/post.model.js";
import { createError } from "../utils/createError.js";

export const createPost = async(req, res, next) => {
    try {
        const postItems = req.body;
        const user = req.user;
        const post = await Post.create({Ref : user.id,...postItems})
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const getPost = async(req, res, next) => {
    try {
        const id = req.query.id;
        const post = await Post.find({Ref : id});

        if(!post) {
            return next(createError(404, "No such post found"));
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}