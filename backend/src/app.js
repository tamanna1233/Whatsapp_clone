import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instalizeSocket } from './scoket/index.js';
import cookieParser from "cookie-parser"
/* This code snippet is setting up a basic Express server with Socket.IO integration. Here's a
breakdown of what each part does: */
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin:process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,

    }
});
instalizeSocket(io);

/* This portion of the code snippet is configuring the Express server with various settings and
middleware: */
app.set('io', io);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser())
/* The code snippet `import userRouter from "./router/user.routes.js"` is importing a router module
from the file `user.routes.js` located in the `router` directory. */

import userRouter from "./router/user.routes.js"
import messageRouter from "./router/message.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/message",messageRouter)
export default server;
