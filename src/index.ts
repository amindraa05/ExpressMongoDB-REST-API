import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';



import router from './router'

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
})

dotenv.config();
const MONGO_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ajq3him.mongodb.net/`

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', router())


