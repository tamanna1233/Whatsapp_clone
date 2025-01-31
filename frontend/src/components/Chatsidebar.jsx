import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { FaPenToSquare } from 'react-icons/fa6';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

const Chatsidebar = () => {
    const chats = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', profilePic: 'https://i.pravatar.cc/40?img=1" ' },
        { id: 2, name: 'Jane Smith', lastMessage: 'See you later!', time: '09:45 AM', profilePic: 'https://i.pravatar.cc/40?img=2" ' },
        { id: 3, name: 'Alex Brown', lastMessage: 'Let’s catch up soon.', time: '08:15 AM', profilePic: 'https://i.pravatar.cc/40?img=3" ' },
        { id: 4, name: 'Emily Clark', lastMessage: 'Did you get the documents?', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=4" ' },
        { id: 5, name: 'Michael Lee', lastMessage: 'I’ll call you back in 10 minutes.', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=5" ' },
        { id: 6, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', profilePic: 'https://i.pravatar.cc/40?img=1" ' },
        { id: 7, name: 'Jane Smith', lastMessage: 'See you later!', time: '09:45 AM', profilePic: 'https://i.pravatar.cc/40?img=2" ' },
        { id: 8, name: 'Alex Brown', lastMessage: 'Let’s catch up soon.', time: '08:15 AM', profilePic: 'https://i.pravatar.cc/40?img=3" ' },
        { id: 9, name: 'Emily Clark', lastMessage: 'Did you get the documents?', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=4" ' },
        { id: 10, name: 'Michael Lee', lastMessage: 'I’ll call you back in 10 minutes.', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=5" ' },
        { id: 11, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', profilePic: 'https://i.pravatar.cc/40?img=1" ' },
        { id: 12, name: 'Jane Smith', lastMessage: 'See you later!', time: '09:45 AM', profilePic: 'https://i.pravatar.cc/40?img=2" ' },
        { id: 13, name: 'Alex Brown', lastMessage: 'Let’s catch up soon.', time: '08:15 AM', profilePic: 'https://i.pravatar.cc/40?img=3" ' },
        { id: 14, name: 'Emily Clark', lastMessage: 'Did you get the documents?', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=4" ' },
        { id: 15, name: 'Michael Lee', lastMessage: 'I’ll call you back in 10 minutes.', time: 'Yesterday', profilePic: 'https://i.pravatar.cc/40?img=5" ' },
      
    ];
  return (
    <Card className="min-h-screen rounded-none bg-gray-950 p-0  ">
      <CardContent className="p-0 ">
        <CardHeader className="p-0 mb-2">
          <div className="flex justify-between items-center text-xl text-white p-2 mt-4">
            <span>Chats</span>
            <FaPenToSquare />
          </div>
          <div className="px-3">
            <Input placeholder="search chat" />
          </div>
          {/* <Separator className="mt-2" /> */}
        </CardHeader>
        <CardDescription>
          <ScrollArea className=" h-screen">
          <div className="space-y-2">
              {chats.map((chat) => (
                <div key={chat.id} className="p-2 text-white hover:bg-gray-800 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={chat.profilePic}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <span className="font-semibold">{chat.name}</span>
                        <p className="text-sm text-gray-300">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{chat.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default Chatsidebar;
