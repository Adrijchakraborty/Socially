import mongoose, { Schema } from 'mongoose';

const friendSchema = new Schema({
    Ref : {
        type : Schema.Types.ObjectId,
        ref : 'Auth'
    },
    following : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Auth'
        }
    ],
    followers : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Auth'
        }
    ],

},{ timestamps: true });

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;