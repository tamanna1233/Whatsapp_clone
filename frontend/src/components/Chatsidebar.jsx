import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { FaPenToSquare } from "react-icons/fa6";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usemessage } from "@/store/messagestore";
import { authstore } from "@/store/authstore";
import { chatEventEnum } from "@/constants";
const ChatsSidebar = () => {
  const {
    availableChats,
    avialablechats,
    setSelectedChat,
    selectedChat,
    createorGetOneOnOneChat,
    getyourChats,
    previousChats,
    setpreviousChats
  } = usemessage();
  
  const { socket, connectSocket, authUser ,checkUser} = authstore(); // Get current user
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat(previousChats); // Update chat state when previousChats changes
  }, [previousChats]);

  const handleAvailableChat = async () => {
    await avialablechats();
  };

  const handleSelectedChat = async (chatId) => {
   await createorGetOneOnOneChat(chatId);
};




  useEffect(() => {
    getyourChats();
  }, [createorGetOneOnOneChat, socket, selectedChat]);

  useEffect(() => {
    if (!socket) {
      connectSocket();
      return;
    }

    console.log("Socket connected:", socket);

    socket.on(chatEventEnum.CONNECTED_EVENT, () => {
      console.log("Connected to socket");
      socket.emit(chatEventEnum.JOIN_CHAT_EVENT, authUser._id);
    });

    socket.on(chatEventEnum.NEW_CHAT_EVENT, (chat) => {
      console.log("New chat received:", chat);
      setpreviousChats((prev) => [...prev, chat]);
    });

    return () => {
      socket.off(chatEventEnum.CONNECTED_EVENT);
      socket.off(chatEventEnum.NEW_CHAT_EVENT);
    };
  }, [socket, connectSocket]);

  return (
    <Card className="min-h-screen rounded-none bg-gray-950 p-0 m-0 border-none shadow-none">
      <CardContent className="p-0">
        <CardHeader className="p-0 mb-4">
          <div className="flex justify-between items-center text-xl text-white p-2 mt-4">
            <span>Chats</span>
            <DropdownMenu onOpenChange={(open) => open && handleAvailableChat()}>
              <DropdownMenuTrigger asChild>
                <FaPenToSquare />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black py-8 w-72 mt-5 backdrop-blur-md z-50 rounded-md px-4">
                <DropdownMenuItem className="flex justify-center text-whitetext-center">
                  Create Group
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <ScrollArea className="h-96">
                  {availableChats?.length > 0 &&
                    availableChats.map((chat) => (
                      <div key={chat._id} className="py-2 text-white">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            
                            handleSelectedChat(chat._id);
                          }}
                          className="hover:bg-gray-700"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <img
                              src={chat.profilePic?.url}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold">{chat.name}</span>
                              <span className="text-gray-500 font-medium">
                                {chat.about}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </div>
                    ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="px-3">
            <Input placeholder="Search Chat" />
          </div>
        </CardHeader>
        <CardDescription className="h-screen">
          <ScrollArea className="h-5/6">
            <div className="space-y-2">
              {chat?.map((chatItem) => {
                // Find the correct participant (not the logged-in user)
               
                const otherParticipant = chatItem.participants.find(
                  (participant) => participant._id !== authUser._id
                );
                return (
                  <div
                    key={chatItem._id}
                    className="p-2 px-4 text-white hover:bg-gray-800 rounded-md cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                     
                      setSelectedChat(chatItem);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={otherParticipant?.profilePic?.url}
                          alt={otherParticipant?.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <span className="font-semibold">
                            {otherParticipant?.name}
                          </span>
                          <p className="text-sm text-gray-300">
                            {chatItem.lastMessage}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{chatItem.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ChatsSidebar;
