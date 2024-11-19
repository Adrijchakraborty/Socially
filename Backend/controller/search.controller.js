import Auth from "../models/auth.model.js";

export const searchUser = async(req,res,next)=>{
    try {
        const username = req.query.username;
        
        const user_list = await Auth.find({
            username: { $regex: username,$options : 'i' }
        })
        res.status(200).json(user_list)
    } catch (error) {
        next(error);
    }
}