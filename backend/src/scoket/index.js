import { disconnect } from 'process';
import { chatEventEnum } from '../constant.js';

const instalizeSocket = (io) => {
    io.on(chatEventEnum.CONNECTED_EVENT, (socket) => {
        console.log('a user is connected');

        socket.on(chatEventEnum.JOIN_CHAT_EVENT, (msg) => {
            console.log('message', msg);
        });

        // socket.on(chatEventEnum.TYPING_EVENT,()=>{console.log("typing...")})
        socket.on(chatEventEnum.DISCONNECT_EVENT, () => {
            console.log('user disconnect');
        });
    });
};

export { instalizeSocket };
