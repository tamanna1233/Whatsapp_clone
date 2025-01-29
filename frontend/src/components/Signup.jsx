import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { authstore } from '@/store/authstore';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const Signup = () => {
    const from = useForm({
        defaultValues: {
            name: '',
            username: '',
            password: '',
            email: '',
            phoneNO: '',
            profilepic: '',
        },
    });
    const {signup}=authstore()
 const [image,setimage]=useState()

    const handelOnSubmit=async(data)=>{
        data.profilepic=image
    const formdata= new FormData()
    Object.keys(data).forEach((key) => {
        formdata.append(key, data[key]); // File field
      });
    
      signup(formdata)

    }

    const handelimage = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/jpeg') {
          setimage(file);
        } else {
          toast({
            variant: 'destructive',
            title: 'Invalid file',
            description: 'Please upload an image file.',
          });
        }
      };

    return (
        <div>
            <Card className="m-8 flex flex-col justify-center items-center bg-transparent rounded-none shadow-none border-none">
                    <CardContent className="m-6 bg-black rounded-lg"> 
                        <CardTitle className="mt-2 text-center text-white text-3xl">wellcome to Whatsapp </CardTitle>
                        <CardHeader className="text-white text-center">if you alreday have account place login</CardHeader>
                        <Form {...from}>
                            <form onSubmit={from.handleSubmit(handelOnSubmit)} className="grid gap-3 px-20 pb-4 text-white">
                                <FormField
                                    name="name"
                                    control={from.control}
                                    rules={{required:"name is required"}}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter your name" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="username"
                                    control={from.control}
                                    rules={{required:"username is required"}}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your username" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={from.control}
                                    rules={{required:"email is required"}}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your email"  {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="phoneNo"
                                    control={from.control}
                                    rules={{required:"phone no is required"}}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your phone no" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={from.control}
                                    rules={{required:"password no is required"}}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="profilepic"
                                    control={from.control}
                                   
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>profilepic</FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    onChange={(e) => {
                                                        handelimage(e);
                                                        field.onChange(e);
                                                      }}
                                                      {...field}
                                                    placeholder="enter your profilepic"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                
            </Card>
        </div>
    );
};

export default Signup;
