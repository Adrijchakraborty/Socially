import Auth from "../models/auth.model.js";
import Friend from "../models/friend.model.js";
import { createError } from "../utils/createError.js";

export const friendList = async (req, res, next) => {
    try {
        const user = req.user;

        // Find the user's friend list
        const userFriendList = await Friend.findOne({ Ref: user.id });
        if (!userFriendList) {
            return next(createError(404, "FriendList does not exist!"));
        }

        const { follower, following } = req.body;

        // Find the friend list of the "following" user
        const followingFriendList = await Friend.findOne({ Ref: following });
        if (!followingFriendList) {
            return next(createError(404, "Following user does not exist!"));
        }

        // Check if already a follower
        if (followingFriendList.followers.includes(follower)) {
            return next(createError(400, "Already a follower!"));
        }

        // Add follower to the following user's followers list
        followingFriendList.followers.push(follower);

        // Check if already following
        if (userFriendList.following.includes(following)) {
            return next(createError(400, "Already following!"));
        }

        // Add following to the user's following list
        userFriendList.following.push(following);

        // Save updates to both documents
        await Promise.all([userFriendList.save(), followingFriendList.save()]);

        res.status(200).json({ message: "Friend list updated successfully!" });
    } catch (error) {
        next(error);
    }
};


export const findUsersWithCommonTopics = async (req, res, next) => {
    try {
        const user = await Auth.findById(req.user.id);
        if (!user) return next(createError(404, "User not found"));

        const user_friendlist = await Friend.findOne({ Ref: user._id });


        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const similarUsers = await Auth.find(
            {
                topics: { $in: user.topics },
                _id: {
                    $ne: user._id,
                    $nin: user_friendlist.following
                }
            }).limit(limit).skip(skip);

        res.status(200).json(similarUsers);
    } catch (error) {
        next(error);
    }
};

export const getFriendList = async (req, res, next) => {
    try {
        const friendList = await Friend.findOne({ Ref: req.user.id })
        res.status(200).json(friendList);
    } catch (error) {
        next(error);
    }
}
