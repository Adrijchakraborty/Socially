import Auth from "../models/auth.model.js";
import { createError } from "../utils/createError.js";

export const friendList = async (req, res, next) => {
    try {
        const user = req.user;
        const list = await Friend.findOne({ Ref: user.id });
        if (!list) return next(createError(404, "FriendList does not exist !!"));

        const { follower, following } = req.body;

        if (follower) {
            if (list.followers.includes(follower)) {
                return next(createError(404, "Already follower"));
            }
            list.followers.push(follower);
        } else {
            if (list.following.includes(following)) {
                return next(createError(404, "Already following"));
            }
            list.following.push(following);
        }

        await list.save();

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

export const findUsersWithCommonTopics = async (req, res, next) => {
    try {
        const user = await Auth.findById(req.user.id);
        if (!user) return next(createError(404, "User not found"));

        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const similarUsers = await Auth.find(
            {
                topics: { $in: user.topics },
                _id : { $ne : user._id}
            }).limit(limit).skip(skip);

        res.status(200).json(similarUsers);
    } catch (error) {
        next(error);
    }
};
