import React, { useState, useEffect } from 'react';
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
import { CircleDotDashed, MessageCircle, Phone, Settings } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import {
      DropdownMenu,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
      DropdownMenuContent,
} from './ui/dropdown-menu';
import { authstore } from '@/store/authstore';
import { Input } from './ui/input';
import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from './ui/alert-dialog';
import { Link, NavLink } from 'react-router';
const AppSidebar = () => {
      const { authUser, logout, deleteuser, updateProfile } = authstore();

      const items = [
            { id: 1, name: 'Chats', icon: MessageCircle, path: '/' },
            { id: 2, name: 'Call', icon: Phone, path: '/call' },
            { id: 3, name: 'Status', icon: CircleDotDashed, path: '/status' },
      ];

      const [userData, setUserData] = useState({
            name: '',
            about: '',
      });

      const [editMode, setEditMode] = useState({
            name: false,
            about: false,
      });

      // **Update userData when authUser is available**
      useEffect(() => {
            if (authUser) {
                  setUserData({
                        name: authUser.name || '',
                        about: authUser.about || '',
                  });
            }
      }, [authUser]);

      const handleEdit = (field) => {
            setEditMode((prev) => ({ ...prev, [field]: true }));
      };

      const handleChange = (e, field) => {
            setUserData((prev) => ({ ...prev, [field]: e.target.value }));
      };

      const handleBlur = async (field) => {
            console.log(field);
            if (!userData[field] || userData[field] === authUser[field]) return; // Prevent sending if unchanged

            await updateProfile(userData);

            setEditMode((prev) => ({ ...prev, [field]: false }));
      };

      return (
            <div>
                  <SidebarProvider>
                        <Sidebar collapsible="icon">
                              <SidebarHeader className="bg-black">
                                    <SidebarTrigger />
                              </SidebarHeader>
                              <SidebarContent className="bg-black backdrop-blur-md">
                                    <SidebarGroup>
                                          <SidebarGroupLabel className="text-2xl font-semibold  text-white">
                                                Whatsapp
                                          </SidebarGroupLabel>
                                          <SidebarGroupContent>
                                                <SidebarMenu className="flex flex-col gap-y-6 mt-8 text-white">
                                                      {items.map((item) => (
                                                            <SidebarMenuItem key={item.id}>
                                                                  <NavLink to={item.path}>
                                                                        <SidebarMenuButton>
                                                                              <div className="flex items-center justify-center gap-2">
                                                                                    {React.createElement(
                                                                                          item.icon,
                                                                                    )}
                                                                                    <span>
                                                                                          {
                                                                                                items.name
                                                                                          }
                                                                                    </span>
                                                                              </div>
                                                                        </SidebarMenuButton>
                                                                  </NavLink>
                                                            </SidebarMenuItem>
                                                      ))}
                                                </SidebarMenu>
                                          </SidebarGroupContent>
                                    </SidebarGroup>
                              </SidebarContent>
                              <SidebarFooter className="bg-black">
                                    <DropdownMenu modal={false}>
                                          <DropdownMenuTrigger aChild>
                                                <Settings
                                                      color="white"
                                                      className="cursor-pointer"
                                                />
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent className="bg-slate-950 rounded-none mx-8 w-96 h-4/5">
                                                <DropdownMenuLabel className="text-white">
                                                      Settings
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="justify-center">
                                                      <img
                                                            src={authUser?.profilePic?.url}
                                                            alt=""
                                                            className="w-16 h-16 rounded-full"
                                                      />
                                                </DropdownMenuItem>
                                                {['name', 'about'].map((field) => (
                                                      <DropdownMenuItem
                                                            key={field}
                                                            className="text-slate-300 justify-between hover:bg-transparent"
                                                            onSelect={(e) => e.preventDefault()}
                                                      >
                                                            {editMode[field] ? (
                                                                  <Input
                                                                        className="text-white"
                                                                        value={userData[field]}
                                                                        onChange={(e) => {
                                                                              handleChange(
                                                                                    e,
                                                                                    field,
                                                                              );
                                                                        }}
                                                                        onBlur={(e) => {
                                                                              handleBlur(field);
                                                                        }}
                                                                        autoFocus
                                                                  />
                                                            ) : (
                                                                  <span>
                                                                        {userData[field] ||
                                                                              'Not provided'}
                                                                  </span>
                                                            )}
                                                            <SquarePen
                                                                  onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleEdit(field);
                                                                  }}
                                                                  className="cursor-pointer"
                                                            />
                                                      </DropdownMenuItem>
                                                ))}

                                                <DropdownMenuItem className="text-slate-300">
                                                      {authUser?.email}
                                                </DropdownMenuItem>
                                                <AlertDialog>
                                                      <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem
                                                                  className="text-slate-300"
                                                                  onSelect={(e) => {
                                                                        e.preventDefault();
                                                                  }}
                                                            >
                                                                  Delete Account
                                                            </DropdownMenuItem>
                                                      </AlertDialogTrigger>
                                                      <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                  <AlertDialogTitle>
                                                                        {' '}
                                                                        Are you abosolutely sure?
                                                                  </AlertDialogTitle>
                                                                  <AlertDialogDescription>
                                                                        This action cannot be
                                                                        undone. This will
                                                                        permanently delete your
                                                                        account and remove your data
                                                                        from our servers.
                                                                  </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                  <AlertDialogCancel>
                                                                        Cancel
                                                                  </AlertDialogCancel>
                                                                  <AlertDialogAction
                                                                        onClick={() => deleteuser()}
                                                                        className="bg-rose-700"
                                                                  >
                                                                        Delete
                                                                  </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                      </AlertDialogContent>
                                                </AlertDialog>
                                                <DropdownMenuSeparator className="mt-16" />
                                                <DropdownMenuItem
                                                      className="text-red-500"
                                                      onClick={() => logout()}
                                                >
                                                      Logout
                                                </DropdownMenuItem>
                                          </DropdownMenuContent>
                                    </DropdownMenu>
                              </SidebarFooter>
                        </Sidebar>
                  </SidebarProvider>
            </div>
      );
};

export default AppSidebar;
