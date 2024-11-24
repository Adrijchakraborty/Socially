import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'



import authRouter from "./router/auth.router.js"
import uploadRouter from "./router/upload.router.js"
import postRouter from "./router/post.router.js"
import friendRouter from "./router/friend.router.js"
import searchRouter from "./router/search.router.js"

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('error connecting to mongodb');
    }
}

app.get('/', (req, res) => {
    res.send("Hello World");
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/post", postRouter);
app.use("/api/friendlist", friendRouter);
app.use("/api/search", searchRouter);

app.use((err, req, res, next) => {
    const stat = err.status || 500;
    const message = err.message || "server error";
    const details = err.stack || "details unknown";

    res.status(stat).json({ status: stat, message: message, details: details, success: false });

})


app.listen(port, () => {
    connect();
    console.log(`server in running at port ${port}`);
});