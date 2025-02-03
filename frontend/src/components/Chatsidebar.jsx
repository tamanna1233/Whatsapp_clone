import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { FaPenToSquare } from 'react-icons/fa6';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { usemessage } from '@/store/messagestore';

const Chats_idebar = () => {
    const { isAvialableChats, avialablechats, setSelectedChat, selectedChat } = usemessage();
   /**
    * The function `handleAvailableChat` calls the `avialablechats` function asynchronously.
    */
    const handleAvailableChat = async () => {
        avialablechats();
    };
   /**
    * The function `handelselectedChat` sets the selected chat data asynchronously.
    */
    const handelselectedChat = async (data) => {
        console.log(data)
        setSelectedChat(data);
    };

    console.log("selected chat",selectedChat)
   /* dummy data
   The above code is defining an array of chat objects. Each chat object contains properties such as
   _id, name, lastMessage, time, and profilePic. These objects represent chat conversations with
   different users, including their names, last messages, timestamps, and profile pictures. */
    const chats = [
        {
            _id: 1,
            name: 'John Doe',
            lastMessage: 'Hey, how are you?',
            time: '10:30 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=1 '},
        },
        {
            _id: 2,
            name: 'Jane Smith',
            lastMessage: 'See you later!',
            time: '09:45 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=2 '},
        },
        {
            _id: 3,
            name: 'Alex Brown',
            lastMessage: 'Let’s catch up soon.',
            time: '08:15 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=3 '},
        },
        {
            _id: 4,
            name: 'Emily Clark',
            lastMessage: 'D_id you get the documents?',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=4 '},
        },
        {
            _id: 5,
            name: 'Michael Lee',
            lastMessage: 'I’ll call you back in 10 minutes.',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=5 '},
        },
        {
            _id: 6,
            name: 'John Doe',
            lastMessage: 'Hey, how are you?',
            time: '10:30 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=6 '},
        },
        {
            _id: 7,
            name: 'Jane Smith',
            lastMessage: 'See you later!',
            time: '09:45 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=7 '},
        },
        {
            _id: 8,
            name: 'Alex Brown',
            lastMessage: 'Let’s catch up soon.',
            time: '08:15 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=8 '},
        },
        {
            _id: 9,
            name: 'Emily Clark',
            lastMessage: 'D_id you get the documents?',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=9 '},
        },
        {
            _id: 10,
            name: 'Michael Lee',
            lastMessage: 'I’ll call you back in 10 minutes.',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=10 '},
        },
        {
            _id: 11,
            name: 'John Doe',
            lastMessage: 'Hey, how are you?',
            time: '10:30 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=11 '},
        },
        {
            _id: 12,
            name: 'Jane Smith',
            lastMessage: 'See you later!',
            time: '09:45 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=12 '},
        },
        {
            _id: 13,
            name: 'Alex Brown',
            lastMessage: 'Let’s catch up soon.',
            time: '08:15 AM',
            profilePic: {url:'https://i.pravatar.cc/40?img=13 '},
        },
        {
            _id: 14,
            name: 'Emily Clark',
            lastMessage: 'D_id you get the documents?',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=14 '},
        },
        {
            _id: 15,
            name: 'Michael Lee',
            lastMessage: 'I’ll call you back in 10 minutes.',
            time: 'Yesterday',
            profilePic: {url:'https://i.pravatar.cc/40?img=15 '},
        },
    ];
    return (
        <Card className="min-h-screen rounded-none bg-gray-950 p-0 m-0 border-none shadow-none ">
            <CardContent className="p-0 ">
                <CardHeader className="p-0 mb-4">
                    <div className="flex justify-between items-center text-xl text-white p-2 mt-4">
                        <span>Chats</span>
                        <DropdownMenu
                            className=""
                            onOpenChange={(open) => {
                                if (open) {
                                    console.log('Dropdown opened');
                                    handleAvailableChat();
                                }
                            }}
                        >
                            <DropdownMenuTrigger asChild>
                                <FaPenToSquare />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black h-96 w-72 mt-5 backdrop-blur-md z-50 rounded-md">
                                <ScrollArea className="h-96 ">
                                    {isAvialableChats.length > 0 &&
                                        isAvialableChats.map((chat) => (
                                            <div key={chat._id} className="py-2 text-white  ">
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handelselectedChat(chat);
                                                    }}
                                                    className=" hover:bg-gray-700 "
                                                >
                                                    <div className="flex justify-between items-center gap-2">
                                                        <img
                                                            src={chat.profilePic?.url}
                                                            alt=""
                                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold">
                                                                {chat.name}
                                                            </span>
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
                        <Input placeholder="search chat" />
                    </div>
                    {/* <Separator className="mt-2" /> */}
                </CardHeader>
                <CardDescription className="h-screen">
                    <ScrollArea className=" h-5/6">
                        <div className="space-y-2">
                            {chats.map((chat) => (
                                <div
                                    key={chat._id}
                                    className="p-2 px-4 text-white hover:bg-gray-800 rounded-md cursor-pointer"
                                    onClick={(e)=>{e.preventDefault() ;handelselectedChat(chat)}}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={chat.profilePic?.url}
                                                alt={chat.name}
                                                className="w-10 h-10 rounded-full object-cover mr-3"
                                            />
                                            <div>
                                                <span className="font-semibold">{chat.name}</span>
                                                <p className="text-sm text-gray-300">
                                                    {chat.lastMessage}
                                                </p>
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

export default Chats_idebar;
