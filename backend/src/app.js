import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instalizeSocket } from './scoket/index.js';
import cookieParser from 'cookie-parser';
import logger from './logger.js';
import morgan from 'morgan';
import cron from "node-cron"
/* This code snippet is setting up a basic Express server with Socket.IO integration. Here's a
breakdown of what each part does: */
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
 io.use((socket, next) => {
           const emitOriginal = socket.emit;
         
           socket.emit = function (...args) {
               console.log('Event emitted:', args[0], 'Payload:', args[1]);
               emitOriginal.apply(socket, args);
           };
           next();
       });

instalizeSocket(io);
/* The line `const morganFormat = ":method :url :status :response-time ms";` is defining a format
string that specifies how the logging information should be structured when using the Morgan
middleware in the Express server. */
const morganFormat = ':method :url :status :response-time ms';

/* This portion of the code snippet is configuring the Express server with various settings and
middleware: */
app.set('io', io);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
/* This code snippet is setting up logging using the Morgan middleware in the Express server. Here's a
breakdown of what it does: */
// app.use(
//     morgan(morganFormat, {
//         stream: {
//             write: (message) => {
//                 const logObject = {
//                     method: message.split(' ')[0],
//                     url: message.split(' ')[1],
//                     status: message.split(' ')[2],
//                     responseTime: message.split(' ')[3],
//                 };
//                 logger.info(JSON.stringify(logObject));
//             },
//         },
//     }),
// );

/* The code snippet `import userRouter from "./router/user.routes.js"` is importing a router module
from the file `user.routes.js` located in the `router` directory. */

import userRouter from './router/user.routes.js';
import chatRouter from './router/chat.routes.js';
import messageRouter from "./router/message.routes.js"
import statusRouter from './router/status.routes.js'
import { Status } from './Models/status.model.js';
import { deleteOnCloudninary } from './utils/cloudnariy.js';
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/status',statusRouter);


cron.schedule("* * * * *", async () => {
    try {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
  
      // Step 1: Find expired statuses
      const expiredStatuses = await Status.find({ createdAt: { $lt: cutoff } });
  
      if (expiredStatuses.length === 0) {
        console.log("No old statuses to delete");
        return;
      }
  
      // Step 2: Delete media from Cloudinary
      for (const status of expiredStatuses) {
        if (status.content && status.content.public_id) {
          try {
            await deleteOnCloudninary(status.content.public_id);
            console.log(`Deleted from Cloudinary: ${status.content.public_id}`);
          } catch (err) {
            console.error(`Failed to delete ${status.content.public_id} from Cloudinary:`, err);
          }
        }
      }
  
      // Step 3: Delete from MongoDB
      await Status.deleteMany({ createdAt: { $lt: cutoff } });
  
      console.log("Old statuses deleted successfully");
    } catch (error) {
      console.error("Error deleting old statuses:", error);
    }
  });

export default server;
