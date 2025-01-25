import { chatEventEnum } from '../constant.js';
import cookie from 'cookie';
import { apiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import {User} from '../Models/usermodel.js';
const mountJoinChatEvent = (socket) => {
    socket.on(chatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};

const mountParticipantTypingEvent = (socket) => {
    socket.on(chatEventEnum.TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum.TYPING_EVENT, chatId);
    });
};

const mountParticipantStoppedTypingEvent = (socket) => {
    socket.on(chatEventEnum.STOP_TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum.STOP_TYPING_EVENT, chatId);
    });
};

const instalizeSocket = (io) => {
    return io.on(chatEventEnum.CONNECTED_EVENT, async (socket) => {
        try {
            const cookies = cookie.parse(socket.handshake?.headers?.cookie || '');
            let token = cookies?.accessToken;
            if (!token) {
                token = socket.handshake.auth.token;
            }

            if (!token) {
                throw new apiError(400, 'unauthroised handshake  token is missing');
            }

            const decodeToken = jwt.verify(token, process.env.AccessTokenSecret);
            const user = await User.findbyId(decodeToken._id).select('-password -refreshToken ');

            if (!user) {
                throw new apiError(404, 'unauthroised handshake token is invaild');
            }
            socket.user = user;
            socket.join(user._id);
            socket.emit(chatEventEnum.CONNECTED_EVENT);
            console.log(`usr is conected  👤 ${user._id.toString()}`);

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

const emitSocketEvent = async (req, roomid, event, payload) => {
    return req.app.get('io').in(roomid).emit(event, payload);
};
export { instalizeSocket, emitSocketEvent };
