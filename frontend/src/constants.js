export const chatEventEnum = Object.freeze({
    // when socket connected
    CONNECTED_EVENT: 'connected"',
    // when scoket disconnect
    DISCONNECT_EVENT: 'disconnect',
    // when particpant join chat
    JOIN_CHAT_EVENT: 'joinChat',
    // ?when participant removed from group or leave chat or delete chat
    LEAVE_CHAT_EVENT: 'leaveChat',
    UPDATE_GROUP_NAME_EVENT: 'updateGroupName',
    // ? when new message is received
    MESSAGE_RECEIVED_EVENT: 'messageReceived',
    // ? when there is new one on one chat, new group chat or user gets added in the group
    NEW_CHAT_EVENT: 'newChat',
    // ? when there is an error in socket
    SOCKET_ERROR_EVENT: 'socketError',
    // ? when participant stops typing
    STOP_TYPING_EVENT: 'stopTyping',
    // ? when participant starts typing
    TYPING_EVENT: 'typing',
    // ? when message is deleted
    MESSAGE_DELETE_EVENT: 'messageDeleted',
});
