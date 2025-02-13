import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import Chatsidebar from '@/components/Chatsidebar';
import ChatBox from '../ChatBox';

const Chat = () => {
      return (
            <div className="h-full w-full">
                  <ResizablePanelGroup direction="horizontal" className="flex h-full">
                        {/* Chatsidebar Panel */}
                        <ResizablePanel minSize={30} defaultSize={30} maxSize={60} className="bg-slate-800">
                              <Chatsidebar />
                        </ResizablePanel>

                        {/* Resizable Handle between panels */}
                        <ResizableHandle className="bg-gray-500 cursor-col-resize" />

                        {/* Main content Panel */}
                        <ResizablePanel defaultSize={70} className="">
                              {/* Your main content goes here */}
                              <ChatBox />
                        </ResizablePanel>
                  </ResizablePanelGroup>
            </div>
      );
};

export default Chat;
