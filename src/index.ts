import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
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

const MONGO_URL = 'mongodb+srv://amindraa05:fzI19j9y38IoRDL9@cluster0.ajq3him.mongodb.net/'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', router())


