import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { EllipsisVertical, PhoneCall, Timer, Video } from 'lucide-react';
import { Search } from 'lucide-react';
import { Phone } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useChat } from '@/store/chatStore';
import { FaPhone, FaVideo, FaWhatsapp } from 'react-icons/fa6';
import { authstore } from '@/store/authstore';
import { chatEventEnum } from '@/constants';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent } from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { AiFillVideoCamera } from 'react-icons/ai';
import { usemessage } from '@/store/messagestore';
import { Textarea } from './ui/textarea';
import { TiTickOutline } from "react-icons/ti";
const ChatBox = () => {
    const { selectedChat } = useChat();
    const { getallmessage, messages, sendmessage ,isMessageSend} = usemessage();
    const { authUser, socket } = authstore();
    const [typing, settyping] = useState(false);
    const [input, setinput] = useState('');
    const otherParticipant = selectedChat?.participants?.find(
        (participant) => participant._id !== authUser._id,
    );

    useEffect(() => {
        if (!socket) return;
        socket.emit(chatEventEnum.JOIN_CHAT_EVENT, selectedChat?._id);
        socket.on(chatEventEnum.TYPING_EVENT, (chatid) => {
            settyping(true);
        });
        socket.on(chatEventEnum.STOP_TYPING_EVENT, () => {
            settyping(false);
        });
        socket.on(chatEventEnum.MESSAGE_RECEIVED_EVENT, (newMessage) => {
            console.log('new message', newMessage);
            usemessage.setState((state) => ({
                messages: [...state.messages, newMessage],
            }));
        });

        return () => {
            socket.off(chatEventEnum.TYPING_EVENT);
            socket.off(chatEventEnum.STOP_TYPING_EVENT);
            socket.off(chatEventEnum.MESSAGE_RECEIVED_EVENT);
        };
    }, [socket, selectedChat]);

    /* The above code is using the `useEffect` hook in React to perform a side effect. It logs "apical" to
the console and then calls the `getallmessage` function with the `selectedChat?._id` as a parameter.
The `useEffect` hook will run this code block whenever the `selectedChat?._id` value changes. */

    useEffect(() => {
        console.log('apical');
        getallmessage(selectedChat?._id);
    }, [selectedChat?._id]);

    const typingTimeoutRef = useRef(null); // Use ref to prevent re-renders

    /* The above code is a React function component that defines a `handleTyping` function using the
    `useCallback` hook. This function emits a `TYPING_EVENT` socket event with the `selectedChat`'s
    ID when called. It also sets a timeout to emit a `STOP_TYPING_EVENT` socket event after 500
    milliseconds if the user stops typing before that time. The `socket` and `selectedChat`
    variables are dependencies for the `useCallback` hook. */
    const handleTyping = useCallback(() => {
        socket.emit(chatEventEnum.TYPING_EVENT, selectedChat?._id);

        // Clear previous timeout
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        // Set new timeout
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit(chatEventEnum.STOP_TYPING_EVENT, selectedChat?._id);
        }, 500);
    }, [socket, selectedChat]);

    const tabs = ['Overview', 'media', 'files', 'group'];
    const handelsendmessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            content: input,
            sender: { _id: authUser?._id },
        };
        sendmessage(selectedChat?._id, newMessage);
        usemessage.setState((state) => ({
            messages: [...state.messages, newMessage],
        }));

        setinput('');
    };

    const handelkeydownsendmessage = (e) => {
        if (!input.trim()) return;
        setinput((prev) => {});
        if (e.key === 'Enter') {
            const newMessage = {
                content: input,
                sender: { _id: authUser?._id },
            };
            sendmessage(selectedChat?._id, newMessage);
            usemessage.setState((state) => ({
                messages: [...state.messages, newMessage],
            }));
            setinput('');
        }
    };
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            <Card className="h-full m-0 rounded-none border-none bg-slate-800 p-0 ">
                {selectedChat ? (
                    <CardContent className="h-full px-0  pb-10 w-full">
                        <CardHeader className="bg-gray-950">
                            <div className="px-0 grid grid-cols-2 pt-1   ">
                                <div className="flex gap-1 justify-start items-center ">
                                    <div className="">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <img
                                                    src={otherParticipant?.profilePic?.url}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="p-0 ">
                                                <Tabs
                                                    className="flex  bg-gray-950 w-96 h-96 "
                                                    defaultValue="Overview"
                                                >
                                                    <TabsList className="flex flex-col items-start px-3 w-1/3 gap-y-2 mt-16 bg-gray-950 text-white">
                                                        {tabs.map((tab) => (
                                                            <TabsTrigger key={tab} value={tab}>
                                                                {tab}
                                                            </TabsTrigger>
                                                        ))}
                                                    </TabsList>
                                                    <Separator orientation="vertical" />
                                                    <div className="w-2/3 bg-gray-800 text-white">
                                                        {tabs.map((tab) => (
                                                            <TabsContent key={tab} value={tab}>
                                                                <Card className="m-0 p-0 bg-transparent rounded-none border-none">
                                                                    <ScrollArea className="h-96">
                                                                        <CardHeader className=" flex flex-col items-center text-white">
                                                                            <img
                                                                                src={
                                                                                    otherParticipant
                                                                                        ?.profilePic
                                                                                        ?.url
                                                                                }
                                                                                className="h-32 w-32 rounded-full p-0"
                                                                            />
                                                                            <span>
                                                                                {String(
                                                                                    otherParticipant?.name,
                                                                                )
                                                                                    .trim()
                                                                                    .toUpperCase()}
                                                                            </span>
                                                                            <span>
                                                                                ~
                                                                                {String(
                                                                                    otherParticipant?.username,
                                                                                )
                                                                                    .trim()
                                                                                    .toLowerCase()}
                                                                                ~
                                                                            </span>
                                                                            <CardContent className="flex justify-center items-center gap-2 aspect-auto object-cover ">
                                                                                <CardDescription className="p-4 w-24 flex justify-center items-center rounded-md bg-gray-950">
                                                                                    <FaVideo />
                                                                                </CardDescription>
                                                                                <CardDescription className="p-4 w-24 flex justify-center items-center rounded-md bg-gray-950">
                                                                                    <FaPhone />
                                                                                </CardDescription>
                                                                            </CardContent>
                                                                        </CardHeader>
                                                                        <CardContent className="text-white flex flex-col ">
                                                                            <span className="font-semibold">
                                                                                About
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    otherParticipant?.about
                                                                                }
                                                                            </span>
                                                                            <span className="font-semibold">
                                                                                Phone No
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    otherParticipant?.phoneNo
                                                                                }
                                                                            </span>
                                                                        </CardContent>
                                                                    </ScrollArea>
                                                                </Card>
                                                            </TabsContent>
                                                        ))}
                                                    </div>
                                                </Tabs>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <span className="flex flex-col gap-0 ">
                                        <h2 className="text-white fixed transfrom -translate-y-5 ">
                                            {otherParticipant.name}
                                        </h2>
                                        <span className=" text-xs p-0 px-1 fixed  translate-y-0 text-emerald-500">
                                            {typing ? (
                                                <>
                                                    typing
                                                    <span className="animate-pulse"> . . .</span>
                                                </>
                                            ) : (
                                                ' '
                                            )}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex  justify-end pt-0 ">
                                    <Button className="bg-transparent hover:bg-slate-300 border-none rounded-full shadow-none">
                                        <Phone />
                                    </Button>
                                    <Button className="bg-transparent  hover:bg-slate-300 border-none rounded-full shadow-none">
                                        <Search />
                                    </Button>
                                    <Button className="bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none">
                                        <EllipsisVertical />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardDescription className="bg-slate-600 h-5/6">
                            <ScrollArea className="h-full flex flex-col gap-4 p-4 ">
                                {messages?.map((msg, index) => {
                                    const isSender = msg?.sender?._id !== authUser?._id;

                                    return (
                                        
                                        <>

                                        <div
                                            key={index}
                                            className={`flex  items-center w-full ${isSender ? 'justify-start' : 'justify-end'} `}
                                            >
                                            {isSender && (
                                                <img
                                                    src={msg?.sender?.profilePic?.url}
                                                    className="w-6 h-6 rounded-full m-2"
                                                />
                                            )}
                                            
                                            <div
                                                className={`p-2 mt-2 rounded-lg shadow-md max-w-xs break-words ${
                                                    isSender
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-black'
                                                }`}
                                                ref={scrollRef}
                                            >
                                                <span className='flex items-center gap-x-2'>

                                                {msg.content}
                                                {/* {isMessageSend?<TiTickOutline  />:<Timer/>} */}
                                                </span>
                                            </div>
                                            {!isSender && (
                                                <img
                                                    src={authUser.profilePic?.url}
                                                    className="w-6 h-6 rounded-full m-2"
                                                />
                                            )}
                                        </div>

                                        {typing && (
                                            
    <div
        ref={scrollRef}
        className="flex items-center gap-2 mt-4 "
    >
        <div className="bg-gray-300 p-2 px-4 rounded-lg text-black ">
            Typing <span className="animate-pulse "><><span className='animate-bounce'>.</span>.<span className='animate-bounce'>.</span> </></span>
        </div>
    </div>
)}
                                        </>
                                    );
                                })}

                            </ScrollArea>
                        </CardDescription>

                    
                        <CardFooter className="flex items-center justify-center gap-2   bg-gray-950 p-4  ">
                            {/* <div className='flex'> */}
                            <Button className="bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none text-6xl">
                                <Plus />
                            </Button>

                            <Input
                                type="text"
                                className="h-10 text-white"
                                placeholder="type a message"
                                onChange={(e) => {
                                    setinput(e.target.value);
                                    handleTyping();
                                }}
                                value={input}
                                onKeyPress={handelkeydownsendmessage}
                            />
                            <Button
                                className="bg-white text-black hover:bg-green-700 hover:text-white "
                                onClick={handelsendmessage}
                            >
                                <SendHorizontal size={24} />
                            </Button>
                            {/* </div> */}
                        </CardFooter>
                    </CardContent>
                ) : (
                    <CardContent className="flex justify-center items-center h-full">
                        <div className="flex flex-col items-center">
                            <FaWhatsapp size={75} color="white" />
                            <span className="text-3xl text-white font-medium">
                                welcome to whatsApp Web
                            </span>
                            <span className="text-gray-400">
                                Send and receive messages online without keeping your phone online
                            </span>
                        </div>
                    </CardContent>
                )}
            </Card>
        </>
    );
};

export default ChatBox;
