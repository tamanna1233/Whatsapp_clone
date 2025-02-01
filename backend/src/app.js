import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instalizeSocket } from './scoket/index.js';
import cookieParser from "cookie-parser"
import logger from "./logger.js";
import morgan from "morgan";
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
/* The line `const morganFormat = ":method :url :status :response-time ms";` is defining a format
string that specifies how the logging information should be structured when using the Morgan
middleware in the Express server. */
const morganFormat = ":method :url :status :response-time ms";

/* This portion of the code snippet is configuring the Express server with various settings and
middleware: */
app.set('io', io);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser())
/* This code snippet is setting up logging using the Morgan middleware in the Express server. Here's a
breakdown of what it does: */
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

/* The code snippet `import userRouter from "./router/user.routes.js"` is importing a router module
from the file `user.routes.js` located in the `router` directory. */

import userRouter from "./router/user.routes.js"
import messageRouter from "./router/message.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/message",messageRouter)
export default server;
