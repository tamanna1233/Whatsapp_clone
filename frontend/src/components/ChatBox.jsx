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
import { Separator } from './ui/separator';
import { usemessage } from '@/store/messagestore';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
      ContextMenu,
      ContextMenuContent,
      ContextMenuItem,
      ContextMenuTrigger,
} from '@radix-ui/react-context-menu';
import { MdClose } from 'react-icons/md';
import { usecallStore } from '@/store/useCallStore';
const ChatBox = () => {
      /* The above code snippet is written in JavaScript using React. It appears to be a component or
    function that is handling chat functionality. Here is a breakdown of what the code is doing: */
      const { selectedChat } = useChat();
      const { getallmessage, messages, sendmessage, isMessageSend, deleteMessage } = usemessage();
      const { authUser, socket } = authstore();
      const [typing, settyping] = useState(false);
      const [input, setinput] = useState('');
      const [typingchatId, setTypingChatId] = useState(null);
      const documentRef = useRef();
      const [file, setfile] = useState('');
      const [selecteMessage, setSelectedMessage] = useState(false);
      const { startCall } = usecallStore();
      const otherParticipant = selectedChat?.participants?.find(
            (participant) => participant?._id !== authUser?._id,
      );
      const [selectedImage, setselectedImage] = useState('');
      /* The above code is a `useEffect` hook in a React component that is setting up event listeners for
   a chat application using a socket connection. Here is a breakdown of what the code is doing: */
      useEffect(() => {
            if (!socket) return;
            socket.emit(chatEventEnum.JOIN_CHAT_EVENT, selectedChat?._id);
            socket.on(chatEventEnum.TYPING_EVENT, (chatid) => {
                  setTypingChatId(chatid);

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

            socket.on(chatEventEnum.MESSAGE_DELETE_EVENT, (message) => {
                  console.log('mesage delete ', message);
                  usemessage.setState((state) => ({
                        messages: state.messages.filter((msg) => msg?._id !== message?._id),
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
            let Fileinput = documentRef.current.files;

            console.log(File);
            const formdata = new FormData();
            formdata.append('content', input);
            formdata.append('sender', { _id: authUser?._id });
            if (Fileinput && Fileinput.length > 0) {
                  // Append each file separately
                  Array.from(Fileinput).forEach((file) => {
                        formdata.append('attachments', file);
                  });
            }
            // const newMessage = {
            //       content: input,
            //       sender: { _id: authUser?._id },
            //       attachment: Fileinput
            //             ? [...Fileinput].map((file) => ({ url: URL.createObjectURL(file) }))
            //             : [],
            //       chat: selectedChat?._id,
            // };
            sendmessage(selectedChat?._id, formdata);
            // usemessage.setState((state) => ({
            //       messages: [...state.messages, newMessage],
            // }));
            setinput('');
            setfile('');
            if (Fileinput) {
                  Fileinput.value = '';
            }
      };

      const handelkeydownsendmessage = (e) => {
            if (e.key === 'Enter') {
                  let Fileinput = documentRef.current?.files; // Get file input
                  const formdata = new FormData();
                  formdata.append('content', input);
                  formdata.append('sender', authUser?._id); // Stringify object if needed

                  if (Fileinput && Fileinput.length > 0) {
                        // Append each file separately
                        Array.from(Fileinput).forEach((file) => {
                              formdata.append('attachments', file);
                        });
                  }

                  // const newMessage = {
                  //       content: input,
                  //       sender: { _id: authUser?._id },
                  //       attachment: Fileinput
                  //             ? [...Fileinput].map((file) => ({ url: URL.createObjectURL(file) }))
                  //             : [],
                  //       chat: selectedChat?._id,
                  // };

                  sendmessage(selectedChat?._id, formdata);

                  // usemessage.setState((state) => ({
                  //       messages: [...state.messages, newMessage],
                  // }));

                  setinput('');
                  setfile('');

                  if (documentRef.current) {
                        documentRef.current.value = ''; // Reset input
                  }
            }
      };

      const scrollRef = useRef(null);

      useEffect(() => {
            if (scrollRef.current) {
                  scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
      }, [messages, typing]);

      const handleFileChange = (e) => {
            const inputFiles = Array.from(e.target.files); // Convert FileList to array
            console.log(inputFiles);

            if (inputFiles.length > 0) {
                  const fileObjects = inputFiles.map((file) => ({
                        url: URL.createObjectURL(file),
                        file,
                  }));

                  setfile(fileObjects);
            }
      };

      const handelclose = () => {
            setselectedImage(null);
      };

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
                                                                              src={
                                                                                    otherParticipant
                                                                                          ?.profilePic
                                                                                          ?.url ||
                                                                                    'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                                                                              }
                                                                              alt=""
                                                                              className="w-10 h-10 rounded-full object-cover"
                                                                        />
                                                                  </DropdownMenuTrigger>
                                                                  <DropdownMenuContent className="p-0 ">
                                                                        <Tabs
                                                                              className="flex  bg-gray-950 w-96 h-96 "
                                                                              defaultValue="Overview"
                                                                        >
                                                                              <TabsList className="flex flex-col items-start px-3 w-1/3 gap-y-2 mt-16 bg-gray-950 text-white">
                                                                                    {tabs.map(
                                                                                          (tab) => (
                                                                                                <TabsTrigger
                                                                                                      key={
                                                                                                            tab
                                                                                                      }
                                                                                                      value={
                                                                                                            tab
                                                                                                      }
                                                                                                >
                                                                                                      {
                                                                                                            tab
                                                                                                      }
                                                                                                </TabsTrigger>
                                                                                          ),
                                                                                    )}
                                                                              </TabsList>
                                                                              <Separator orientation="vertical" />
                                                                              <div className="w-2/3 bg-gray-800 text-white">
                                                                                    {tabs.map(
                                                                                          (tab) => (
                                                                                                <TabsContent
                                                                                                      key={
                                                                                                            tab
                                                                                                      }
                                                                                                      value={
                                                                                                            tab
                                                                                                      }
                                                                                                >
                                                                                                      <Card className="m-0 p-0 bg-transparent rounded-none border-none">
                                                                                                            <ScrollArea className="h-96">
                                                                                                                  <CardHeader className=" flex flex-col items-center text-white ">
                                                                                                                        <img
                                                                                                                              src={
                                                                                                                                    otherParticipant
                                                                                                                                          ?.profilePic
                                                                                                                                          ?.url ||
                                                                                                                                    'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                                                                                                                              }
                                                                                                                              className="h-32 w-32 rounded-full p-0 object-cover"
                                                                                                                        />
                                                                                                                        <span>
                                                                                                                              {String(
                                                                                                                                    otherParticipant?.name ||
                                                                                                                                          "what'sappuser",
                                                                                                                              )
                                                                                                                                    .trim()
                                                                                                                                    .toUpperCase()}
                                                                                                                        </span>
                                                                                                                        <span>
                                                                                                                              ~
                                                                                                                              {String(
                                                                                                                                    otherParticipant?.username ||
                                                                                                                                          'whatsappuser',
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
                                                                                                                              Phone
                                                                                                                              No
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
                                                                                          ),
                                                                                    )}
                                                                              </div>
                                                                        </Tabs>
                                                                  </DropdownMenuContent>
                                                            </DropdownMenu>
                                                      </div>
                                                      <span className="flex flex-col gap-0 ">
                                                            <h2 className="text-white fixed transfrom -translate-y-5 ">
                                                                  {otherParticipant?.name ||
                                                                        'whatsappuser'}
                                                            </h2>
                                                            <span className=" text-xs p-0 px-1 fixed  translate-y-0 text-emerald-500">
                                                                  {selectedChat?._id ===
                                                                        typingchatId && typing ? (
                                                                        <>
                                                                              typing
                                                                              <span className="animate-pulse">
                                                                                    {' '}
                                                                                    . . .
                                                                              </span>
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
                                                      <Button
                                                            className="bg-transparent  hover:bg-slate-300 border-none rounded-full shadow-none"
                                                            onClick={() => {
                                                                  console.log('click');
                                                                  startCall(otherParticipant._id);
                                                            }}
                                                      >
                                                            <FaVideo />
                                                      </Button>
                                                      <Button className="bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none">
                                                            <EllipsisVertical />
                                                      </Button>
                                                </div>
                                          </div>
                                    </CardHeader>

                                    <CardDescription className="bg-slate-600 h-5/6">
                                          <ScrollArea className="h-full flex flex-col gap-4 p-4 ">
                                                {messages
                                                      ?.filter(
                                                            (msg) => msg.chat === selectedChat._id,
                                                      ) // Filter messages first
                                                      .map((msg, index) => {
                                                            const isSender =
                                                                  msg?.sender?._id !==
                                                                  authUser?._id;
                                                            return (
                                                                  <>
                                                                        <div
                                                                              key={index}
                                                                              className={`flex  items-center w-full ${isSender ? 'justify-start' : 'justify-end'} `}
                                                                        >
                                                                              {isSender && (
                                                                                    <img
                                                                                          src={
                                                                                                msg
                                                                                                      ?.sender
                                                                                                      ?.profilePic
                                                                                                      ?.url ||
                                                                                                'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                                                                                          }
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
                                                                                    <ContextMenu>
                                                                                          <ContextMenuTrigger
                                                                                                asChild
                                                                                          >
                                                                                                <span className="flex flex-col items-start p-2 gap-x-2 gap-y-2 object-cover">
                                                                                                      {msg
                                                                                                            ?.attachment[0]
                                                                                                            ?.url ? (
                                                                                                            <>
                                                                                                                  <div
                                                                                                                        className={
                                                                                                                              msg
                                                                                                                                    ?.attachment
                                                                                                                                    .length >
                                                                                                                              2
                                                                                                                                    ? 'grid grid-cols-2 gap-3 '
                                                                                                                                    : 'flex justify-center items-center gap-3'
                                                                                                                        }
                                                                                                                  >
                                                                                                                        {msg?.attachment?.map(
                                                                                                                              (
                                                                                                                                    file,
                                                                                                                              ) => {
                                                                                                                                    return (
                                                                                                                                          <img
                                                                                                                                                src={
                                                                                                                                                      file?.url
                                                                                                                                                }
                                                                                                                                                className="w-32 h-32 object-cover cursor-pointer"
                                                                                                                                                onClick={() =>
                                                                                                                                                      setselectedImage(
                                                                                                                                                            file.url,
                                                                                                                                                      )
                                                                                                                                                }
                                                                                                                                          />
                                                                                                                                    );
                                                                                                                              },
                                                                                                                        )}
                                                                                                                  </div>

                                                                                                                  <span className="">
                                                                                                                        {
                                                                                                                              msg?.content
                                                                                                                        }
                                                                                                                  </span>
                                                                                                            </>
                                                                                                      ) : (
                                                                                                            <>
                                                                                                                  <span className="">
                                                                                                                        {
                                                                                                                              msg?.content
                                                                                                                        }
                                                                                                                  </span>
                                                                                                            </>
                                                                                                      )}
                                                                                                </span>
                                                                                          </ContextMenuTrigger>
                                                                                          <ContextMenuContent className="w-32 bg-black mt-8 p-2 rounded-md flex flex-col gap-y-4 text-white">
                                                                                                <ContextMenuItem
                                                                                                      inset
                                                                                                >
                                                                                                      Copy
                                                                                                </ContextMenuItem>
                                                                                                {isSender ? (
                                                                                                      <ContextMenuItem
                                                                                                            inset
                                                                                                            disabled
                                                                                                            className="text-gray-400"
                                                                                                      >
                                                                                                            delete
                                                                                                      </ContextMenuItem>
                                                                                                ) : (
                                                                                                      <ContextMenuItem
                                                                                                            inset
                                                                                                            onClick={() => {
                                                                                                                  console.log(
                                                                                                                        'click',
                                                                                                                  );
                                                                                                                  deleteMessage(
                                                                                                                        {
                                                                                                                              messageId:
                                                                                                                                    msg._id,
                                                                                                                              chatId: msg.chat,
                                                                                                                        },
                                                                                                                  );
                                                                                                            }}
                                                                                                      >
                                                                                                            delete
                                                                                                      </ContextMenuItem>
                                                                                                )}
                                                                                          </ContextMenuContent>
                                                                                    </ContextMenu>
                                                                              </div>
                                                                              {!isSender && (
                                                                                    <img
                                                                                          src={
                                                                                                authUser
                                                                                                      .profilePic
                                                                                                      ?.url
                                                                                          }
                                                                                          className="w-6 h-6 rounded-full m-2"
                                                                                    />
                                                                              )}
                                                                        </div>
                                                                  </>
                                                            );
                                                      })}
                                                {typing && typingchatId === selectedChat?._id && (
                                                      <div className="flex items-center gap-2 mt-4   z-50">
                                                            <img
                                                                  src={
                                                                        otherParticipant?.profilePic
                                                                              ?.url
                                                                  }
                                                                  className="w-6 h-6 rounded-full"
                                                            />
                                                            <div
                                                                  className="bg-gray-300 p-2 px-4 rounded-lg text-black "
                                                                  ref={scrollRef}
                                                            >
                                                                  Typing{' '}
                                                                  <span className="animate-pulse ">
                                                                        <>
                                                                              <span className="animate-bounce">
                                                                                    .
                                                                              </span>
                                                                              .
                                                                              <span className="animate-bounce">
                                                                                    .
                                                                              </span>{' '}
                                                                        </>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                )}
                                          </ScrollArea>
                                    </CardDescription>
                                    {file && (
                                          <div className="fixed bg-black bottom-20 rounded-md">
                                                <div
                                                      className={
                                                            file?.length > 2
                                                                  ? 'grid grid-cols-2 '
                                                                  : 'flex justify-center items-center'
                                                      }
                                                >
                                                      {file.map((file, index) => (
                                                            <CardContent
                                                                  key={index}
                                                                  className=" p-2  rounded-md object-cover"
                                                            >
                                                                  <img
                                                                        src={file.url}
                                                                        className="h-52 w-52 rounded-md object-cover aspect-square"
                                                                  />
                                                                  {input && (
                                                                        <span className="text-white">
                                                                              {input}
                                                                        </span>
                                                                  )}
                                                            </CardContent>
                                                      ))}
                                                </div>
                                          </div>
                                    )}
                                    <CardFooter className="flex items-center justify-center gap-2   bg-gray-950 p-4  ">
                                          {/* <div className='flex'> */}

                                          <Button
                                                className="bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none text-6xl"
                                                onClick={() => {
                                                      console.log('clcik');
                                                      documentRef?.current?.click();
                                                }}
                                          >
                                                <Plus />
                                          </Button>
                                          <Input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="hidden"
                                                ref={documentRef}
                                                onChange={handleFileChange}
                                          />
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
                                                Send and receive messages online without keeping
                                                your phone online
                                          </span>
                                    </div>
                              </CardContent>
                        )}
                  </Card>

                  {selectedImage && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 ">
                              <img
                                    src={selectedImage}
                                    alt=""
                                    className="object-contain h-[70%]  rounded-md"
                              />
                              <button
                                    className="absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-lg"
                                    onClick={handelclose}
                              >
                                    <MdClose size={35} />
                              </button>
                        </div>
                  )}
            </>
      );
};

export default ChatBox;
