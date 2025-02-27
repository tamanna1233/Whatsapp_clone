/* This JavaScript code snippet is defining constants related to a chat application. */
export const dbname = 'whatsapp_clone';
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
     // when a video call is initiated
     VIDEO_CALL_EVENT: 'videoCall',
     //when video call accepted
     VIDEO_CALL_OFFER_EVENT:"videocCallOffer",
     // when an video call is accepted
     VIDEO_CALL_ACCEPT_EVENT: 'audioCallAccept',
     // when an video call is declined
     VIDEO_CALL_DECLINE_EVENT: 'audioCallDecline',
     // when a video call ends
     VIDEO_CALL_END_EVENT: 'videoCallEnd',
 
     // when an audio call is initiated
     AUDIO_CALL_EVENT: 'audioCall',
     // when an audio call is accepted
     AUDIO_CALL_ACCEPT_EVENT: 'audioCallAccept',
     // when an audio call is declined
     AUDIO_CALL_DECLINE_EVENT: 'audioCallDecline',
     // when an audio call ends
     AUDIO_CALL_END_EVENT: 'audioCallEnd',
    
})
export const avilableChatEvent = Object.values(chatEventEnum);
