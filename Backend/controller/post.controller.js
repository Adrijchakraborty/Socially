import Post from "../models/post.model.js";

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