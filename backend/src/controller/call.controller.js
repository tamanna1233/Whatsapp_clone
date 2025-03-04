import { Chat } from '../Models/chat.model';
import { apiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';

const audioCall = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new apiError(400, 'chat not found');
    }
});
