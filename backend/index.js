import express from 'express';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('api/', UserRoute);

app.listen(5000);

console.log('server running');