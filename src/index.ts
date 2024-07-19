import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import routers from './routers';

const app = express();
dotenv.config();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000,() => {
    console.log("Server running on 3000...");
});


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('error', (error: Error) => console.log("Error"));

app.use('/', routers());
