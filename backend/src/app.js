import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {instalizeSocket} from "./scoket/index.js"
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: process.env.CORS_ORIGIN,
});
instalizeSocket(io);

app.set('io', io);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));

export default server;
