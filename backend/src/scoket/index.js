import { chatEventEnum } from '../constant.js';
import cookie from 'cookie';
import { apiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../Models/usermodel.js';
/**
 * The function `mountJoinChatEvent` listens for a user joining a chat and logs the event.
 * @param socket - Socket is an object that represents a connection between the server and a client. It
 * allows for real-time communication between the server and the client using events and data exchange.
 * In this context, the `socket` parameter is being used to listen for a specific event
 * (`JOIN_CHAT_EVENT`) and perform actions when
 */
const mountJoinChatEvent = (socket) => {
    socket.on(chatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};

/**
 * The function `mountParticipantTypingEvent` listens for typing events on a socket and emits them to
 * the corresponding chat room.
 * @param socket - Socket is a communication endpoint that allows different processes to communicate
 * with each other over a network. In this context, it is likely a reference to a socket object used in
 * a chat application to handle real-time communication between participants.
 */
const mountParticipantTypingEvent = (socket) => {
    socket.on(chatEventEnum.TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum.TYPING_EVENT, chatId);
    });
};

/**
 * The function `mountParticipantStoppedTypingEvent` listens for the STOP_TYPING_EVENT on a socket and
 * emits it to the specified chat room.
 * @param socket - Socket is a communication endpoint that allows different processes to communicate on
 * a network. In this context, it is likely referring to a socket object used in a chat application to
 * handle real-time communication between participants.
 */
const mountParticipantStoppedTypingEvent = (socket) => {
    socket.on(chatEventEnum.STOP_TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum.STOP_TYPING_EVENT, chatId);
    });
};

/**
 * The function `instalizeSocket` establishes a socket connection, authenticates the user using a
 * token, and handles various chat events.
 * @param io - The `io` parameter in the `instalizeSocket` function is typically an instance of the
 * Socket.IO server. It allows you to interact with Socket.IO functionality, such as handling
 * connections, emitting events, and managing communication between clients and the server in
 * real-time.
 * @returns The `instalizeSocket` function returns the event listener for handling socket connections.
 */
const instalizeSocket = (io) => {
    return io.on('connection', async (socket) => {
      
        try {
            const cookies = cookie.parse(socket.handshake?.headers?.cookie || '');
            let token = cookies?.accessToken;
            if (!token) {
                token = socket.handshake.auth.token;
            }

            if (!token) {
                throw new apiError(400, 'unauthroised handshake  token is missing');
            }

            const decodeToken = jwt.verify(token, process.env.AccessTokenSecert);

            const user = await User.findById(decodeToken.id).select('-password -refreshToken ');
            if (!user) {
                throw new apiError(404, 'unauthroised handshake token is invaild');
            }
            socket.user = user;
            socket.join(user._id);
            socket.emit(chatEventEnum.CONNECTED_EVENT,user._id.toString());
            console.log(`user is conected  👤 ${user._id.toString()}`);
           
            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);
            socket.on(chatEventEnum.DISCONNECT_EVENT, () => {
                console.log(` user is disconnected ${socket.user._id}`);
                if (socket?.user?._id) {
                    socket.leave(socket.user._id);
                }
            });
        } catch (error) {
            socket.emit(
                chatEventEnum.SOCKET_ERROR_EVENT,
                error.message || 'something went wrong while connecting to socket',
            );
        }
    });
};

/**
 * The function `emitSocketEvent` emits a socket event to all clients in a specific room.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function.
 * @param roomid - The `roomid` parameter in the `emitSocketEvent` function is typically a unique
 * identifier for a specific chat room or group within a real-time communication system. It is used to
 * target a specific room where the event should be emitted to.
 * @param event - The `event` parameter in the `emitSocketEvent` function represents the name of the
 * event that you want to emit to the specified room. It could be a custom event name like
 * "messageReceived", "userJoined", "dataUpdated", etc.
 * @param payload - The `payload` parameter in the `emitSocketEvent` function refers to the data that
 * you want to send along with the event to the clients in the specified room. This data could be any
 * information or message that you want to transmit to the clients listening to the event in the
 * specified room.
 * @returns The `emitSocketEvent` function is returning a Promise, as it is an async function. The
 * Promise will resolve with the result of calling `req.app.get('io').in(roomid).emit(event, payload)`,
 * which emits the specified event with the given payload to all sockets in the specified room.
 */
const emitSocketEvent = async (req, roomid, event, payload) => {
    const io=req.app.get("io")
    console.log("room",roomid)
    io.in(roomid).emit(event, payload);
      
  
};


export { instalizeSocket, emitSocketEvent };
