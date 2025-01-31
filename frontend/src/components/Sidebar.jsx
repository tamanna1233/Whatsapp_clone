import React from 'react';
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    Sidebar,
    SidebarMenu,
    SidebarMenuButton,
    SidebarFooter,
    SidebarHeader,
} from './ui/sidebar';
import {
    ChartAreaIcon,
    CircleAlertIcon,
    CircleDotDashed,
    MessageCircle,
    Phone,
    Settings,
} from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { AiOutlineCluster } from 'react-icons/ai';
const AppSidebar = () => {
    const items = [
        {
            id: 1,
            name: 'Chats',
            icon: MessageCircle,
        },
        {
            id: 2,
            name: 'Call',
            icon: Phone,
        },
        {
            id: 3,
            name: 'Status',
            icon: CircleDotDashed,
        },
    ];

    return (
        <div>
            <SidebarProvider  >
                <Sidebar collapsible="icon"  className="">
                    <SidebarHeader className="bg-black">
                        <SidebarTrigger/>
                    </SidebarHeader>
                    <SidebarContent className="bg-black backdrop-blur-md">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-2xl font-semibold  text-white">
                                Whatsapp
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="flex flex-col gap-y-6 mt-8 text-white">
                                    {items?.map((items) => (
                                        <SidebarMenuItem key={items.id}>
                                            <SidebarMenuButton>
                                                <div className="flex items-center justify-center gap-2">
                                                    <items.icon />
                                                    <span>{items.name}</span>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="bg-black">
                        <Settings color="white" />
                    </SidebarFooter>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
};

export default AppSidebar;
