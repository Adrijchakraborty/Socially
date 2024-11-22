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

export const getUserPosts = async(req, res, next) => {
    try {
        const id = req.query.id;
        const post = await Post.find({Ref : id}).sort({updatedAt : -1});

        if(!post) {
            return next(createError(404, "No such post found"));
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const getPost = async(req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);
        if(!post) return next(createError(404, "Post Not Found"));

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const editLikes = async(req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);
        if(!post) return next(createError(404, "Post Not Found"));

        if(post.likes.includes(req.user.id)) {
            post.likes = post.likes.filter((like)=>like === req.user.id);
        }
        else {
            post.likes.push(req.user.id);
        }

        await post.save();

        res.status(200).json(post);

    } catch (error) {
        next(error);
    }
}

export const editComments = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {comment} = req.body;

        const post = await Post.findById(id);
        if(!post) return next(createError(404, "Post Not Found"));

        const cnt = {
            userId : req.user.id,
            commentText : comment
        }

        post.comments.push(cnt);

        await post.save();

        res.status(200).json(post);

    } catch (error) {
        next(error);
    }
}