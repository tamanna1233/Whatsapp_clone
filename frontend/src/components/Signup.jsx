import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { authstore } from '@/store/authstore';
import { Button } from './ui/button';

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
    const {Signup}=authstore()

    const handelOnSubmit=async(data)=>{
    const formdata=FormData()
    Object.keys(data).forEach((key) => {
        formdata.append(key, data[key]); // File field
      });
    

    }

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
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter your name" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="username"
                                    control={from.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your username" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={from.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your email" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="phoneNo"
                                    control={from.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>

                                            <FormControl>
                                                <Input placeholder="enter your phone no" />
                                            </FormControl>
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
