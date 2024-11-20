import mongoose, { Schema } from 'mongoose';

const authSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
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
        default: 'https://imgs.search.brave.com/9OiswaaeRgvyBUOQde0fj79HhEwbfIxkiqLqEIop4cU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgzL2Jj/LzhiLzgzYmM4Yjg4/Y2Y2YmM0YjRlMDRk/MTUzYTQxOGNkZTYy/LmpwZw'
    }
},{ timestamps: true });

const Auth = mongoose.model('Auth', authSchema);

export default Auth;