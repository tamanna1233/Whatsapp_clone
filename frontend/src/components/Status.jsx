import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Plus, EllipsisVertical } from 'lucide-react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { authstore } from '@/store/authstore';
import { useStatus } from '@/store/statusStore';
import Statusplayer from './statusplayer';
import { MdClose } from 'react-icons/md';
const Status = () => {
      const { authUser } = authstore();
      const { myStatus, getMystatus, getAllStatus, status, uploadStatus } = useStatus();

      // State to track which status is being played
      const [selectedStatus, setSelectedStatus] = useState(false);
      const [viwedStatus, setviewStatus] = useState(new Set());

      useEffect(() => {
            getMystatus();
            getAllStatus();
            const storeViwedStatus = JSON.parse(localStorage.getItem('viwedStatus')) || [];

            setviewStatus(new Set(storeViwedStatus));
            console.log(storeViwedStatus);
      }, [getAllStatus, getMystatus]);

      // Handle clicking on a status
      const handleStories = () => {
            setSelectedStatus(true); // Set the selected status for display
      };
      // Close the Statusplayer
      const closeStatusPlayer = () => {
            setSelectedStatus(null);
      };
      const input = useRef();
      const handleinput = () => {
            input.current.click();
            console.log('clicked');
      };
      const onchange = () => {
            console.log(input?.current?.files);
            const file = input.current.files[0];
            uploadStatus(file);
      };
      return (
            <>
                  <Card className="m-0 p-0 border-none shadow-none text-white bg-slate-900 w-full rounded-none">
                        {/* Header */}
                        <CardHeader className="flex flex-row justify-between bg-slate-900">
                              <CardTitle>
                                    <h2>Status</h2>
                              </CardTitle>
                              {/* <div className="flex gap-3">
                                    <Plus size={24} />
                                    <EllipsisVertical />
                              </div> */}
                        </CardHeader>

                        {/* My Status Section */}
                        <CardContent className="bg-slate-900">
                              <div className="flex gap-2 items-center">
                                    <div className="relative">
                                          <img
                                                src={authUser?.profilePic?.url}
                                                alt="Profile"
                                                className={`h-16 w-16 rounded-full object-cover ${
                                                      myStatus?.content?.length > 0
                                                            ? 'border-green-600 border-4'
                                                            : ''
                                                }`}
                                                onClick={() => {console.log(myStatus); handleStories(myStatus[0])}}
                                          />
                                          <div className="bg-teal-900 absolute bottom-0 right-0 h-6 w-6 rounded-full flex justify-center items-center">
                                                <Plus
                                                      className="text-white"
                                                      size={22}
                                                      onClick={handleinput}
                                                />
                                                <input
                                                      type="file"
                                                      hidden
                                                      ref={input}
                                                      onChange={onchange}
                                                />
                                          </div>
                                    </div>
                                    <div>
                                          <b>My Status</b>
                                          <p className="text-sm text-gray-400">
                                                Click to add status update
                                          </p>
                                    </div>
                              </div>
                        </CardContent>
                        <Separator className="h-0.5" />

                        {/* Recent Status Section */}
                        <CardDescription className="bg-slate-900 py-2 pb-16 px-4">
                              <h1 className="text-green-600 text-lg">Recent</h1>
                              <ScrollArea className="my-4 h-96">
                                    {status?.length > 0 &&
                                          status.map((item, index) => {
                                                const isviwed = item.statusId?.every((id) => {
                                                      return viwedStatus.has(id);
                                                });

                                                return (
                                                      <div
                                                            key={index}
                                                            className="flex items-center gap-2 text-white font-bold cursor-pointer"
                                                            onClick={() => handleStories(item)} // Click event to open status player
                                                      >
                                                            <img
                                                                  src={item?.profile}
                                                                  alt="User"
                                                                  className={`w-16 h-16 rounded-full border-4 ${isviwed ? 'border-white' : 'border-green-600'}
                    
                    `}
                                                            />

                                                            <div className="flex flex-col">
                                                                  <span>{item.name}</span>
                                                                  <span className="text-sm text-gray-400">
                                                                        {item.time}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                              </ScrollArea>
                        </CardDescription>
                  </Card>

                  {/* Status Player Modal */}
                  {selectedStatus && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                              <Statusplayer
                                    stories={myStatus[0]}
                                    closeplayer={closeStatusPlayer}
                                    setviwedStatus={setviewStatus}
                              />
                              <button
                                    className="absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-lg"
                                    onClick={closeStatusPlayer}
                              >
                                    <MdClose size={35} />
                              </button>
                        </div>
                  )}
            </>
      );
};

export default Status;
