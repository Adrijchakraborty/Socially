import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    postImage : {
        type : String,
        required : true
    },
    postDetails : {
        type : String
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Auth'
        }
    ],
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'Auth'
            },
            commentText: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    Ref : {
        type: Schema.Types.ObjectId,
        ref : 'Auth'
    }
},{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;