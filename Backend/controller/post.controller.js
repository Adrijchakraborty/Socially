import Friend from "../models/friend.model.js";
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

        const post = await Post.findById(id).populate("comments.userId", "username email");
        if(!post) return next(createError(404, "Post Not Found"));

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const editLikes = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);
        if (!post) return next(createError(404, "Post Not Found"));

        if (post.likes.includes(req.user.id)) {
            // Remove the user ID from likes
            post.likes = post.likes.filter((like) => like.toString() !== req.user.id.toString());
        } else {
            // Add the user ID to likes
            post.likes.push(req.user.id);
        }

        await post.save();

        // Optionally populate related data
        const updatedPost = await Post.findById(post._id).populate(
            "comments.userId",
            "username email"
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};


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

        post.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        await post.save();

        const updatedPost = await Post.findById(post._id).populate("comments.userId", "username email");
        res.status(200).json(updatedPost);

    } catch (error) {
        next(error);
    }
}

export const getFollowingFeedPosts = async (req, res, next) => {
    try {
        // Find the following list of the current user
        const followingFeed = await Friend.findOne({ Ref: req.user.id }).select("following");
        if (!followingFeed) return res.status(404).json({ message: "No following data found." });

        const followingIds = followingFeed.following; // Extract the list of following user IDs

        // Find posts by users the current user is following
        const posts = await Post.find({ Ref: { $in: followingIds } }) // Fetch posts by user IDs
            .sort({ createdAt: -1 }) // Sort by updatedAt in descending order
            .populate([
                {
                    path : "Ref",
                    select : "username email profile"
                },
                {
                    path : "comments.userId",
                    select : "username email"
                },
                
            ]).skip(0).limit(10);

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const Limit = parseInt(req.query.limit, 10) || 10; 
        const Skip = parseInt(req.query.skip, 10) || 0;

        const posts = await Post.find({}).sort({ createdAt: -1 }).populate([
            {
                path: "Ref",
                select: "username email profile",
            },
            {
                path: "comments.userId",
                select: "username email",
            },
        ]).skip(Skip).limit(Limit);

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};
