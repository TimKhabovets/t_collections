import * as dotenv from 'dotenv';
import express from 'express';
import UserRoute from './routes/UserRoute.js';
import CollectionRoute from './routes/CollectionRoute.js';
import ItemRoute from './routes/ItemRoute.js';
import PhotoRoute from './routes/PhotoRoute.js';
import FieldRoute from './routes/FieldRoute.js';
import TagRoute from './routes/TagRoute.js';
import LikeRoute from './routes/LikeRoute.js';
import CommentRoute from './routes/CommentRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/ErrorMiddleware.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    credentials: true,
    origin: true//process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", UserRoute);
app.use("/api/collection", CollectionRoute);
app.use("/api/item", ItemRoute);
app.use("/api/photo", PhotoRoute);
app.use("/api/field", FieldRoute);
app.use("/api/tag", TagRoute);
app.use("/api/like", LikeRoute);
app.use("/api/comment", CommentRoute);
app.use(errorMiddleware);

app.listen(PORT, () => console.log('server running on port ' + PORT));