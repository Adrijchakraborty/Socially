import mongoose, { Schema } from 'mongoose';

const authSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    topics: Array,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile : {
        type: String,
        default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    }
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;