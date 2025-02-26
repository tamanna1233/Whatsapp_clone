import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { authstore } from '@/store/authstore';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Link } from 'react-router';
import Status from './Status';

const Signup = () => {
      /* The code snippet you provided is setting up a React functional component for a signup form. Let's
   break down the code: */
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
      const { signup } = authstore();
      const [image, setimage] = useState();

      /**
       * The function `handelOnSubmit` takes in data, assigns a profile picture to it, converts the data
       * into FormData, appends each key-value pair to the FormData, and then calls the `signup` function
       * with the FormData as an argument.
       */
      const handelOnSubmit = async (data) => {
            data.profilepic = image;
            const formdata = new FormData();
            Object.keys(data).forEach((key) => {
                  formdata.append(key, data[key]); // File field
            });

            signup(formdata);
      };

      /**
       * The function `handelimage` checks if the uploaded file is a JPEG image and sets it as the image
       * state, otherwise displays an error message.
       */
      const handelimage = (e) => {
            const file = e.target.files[0];
            console.log(file.type);

            if ((file && file.type === 'image/jpeg') || 'image/png') {
                  setimage(file);
            } else {
                  toast({
                        variant: 'destructive',
                        title: 'Invalid file',
                        description: 'Please upload an image file.',
                  });
            }
      };
      console.log(image);

      return (
            <div>
                  <Card className="m-8 flex flex-col justify-center items-center bg-transparent rounded-none shadow-none border-none">
                        <CardContent className="m-6 bg-black rounded-lg">
                              <CardTitle className="mt-2 text-center text-white text-3xl">
                                    wellcome to Whatsapp{' '}
                              </CardTitle>
                              <CardHeader className="text-white text-center">
                                    if you alreday have account please{' '}
                                    <Link to="/signin">login</Link>{' '}
                              </CardHeader>
                              <CardTitle className="mt-2 text-center text-white text-3xl">
                                    Welcome to Whatsapp{' '}
                              </CardTitle>

                              <Form {...from}>
                                    <form onSubmit={from.handleSubmit(handelOnSubmit)}>
                                          <CardDescription className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-20 pb-4 text-white">
                                                <FormField
                                                      name="name"
                                                      control={from.control}
                                                      rules={{ required: 'name is required' }}
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Name</FormLabel>
                                                                  <FormControl>
                                                                        <Input
                                                                              placeholder="enter your name"
                                                                              {...field}
                                                                        />
                                                                  </FormControl>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      name="username"
                                                      control={from.control}
                                                      rules={{ required: 'username is required' }}
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Username</FormLabel>

                                                                  <FormControl>
                                                                        <Input
                                                                              placeholder="enter your username"
                                                                              {...field}
                                                                        />
                                                                  </FormControl>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      name="email"
                                                      control={from.control}
                                                      rules={{ required: 'email is required' }}
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Email</FormLabel>

                                                                  <FormControl>
                                                                        <Input
                                                                              placeholder="enter your email"
                                                                              {...field}
                                                                        />
                                                                  </FormControl>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      name="phoneNo"
                                                      control={from.control}
                                                      rules={{ required: 'phone no is required' }}
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Phone</FormLabel>

                                                                  <FormControl>
                                                                        <Input
                                                                              placeholder="enter your phone no"
                                                                              {...field}
                                                                        />
                                                                  </FormControl>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      name="password"
                                                      control={from.control}
                                                      rules={{
                                                            required: 'password no is required',
                                                      }}
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Password</FormLabel>

                                                                  <FormControl>
                                                                        <Input
                                                                              placeholder="enter your password"
                                                                              {...field}
                                                                        />
                                                                  </FormControl>
                                                                  <FormMessage />
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
                                                                              {...field}
                                                                              placeholder="enter your profilepic"
                                                                              onChange={(e) => {
                                                                                    handelimage(e);
                                                                                    field.onChange(
                                                                                          e,
                                                                                    );
                                                                              }}
                                                                        />
                                                                  </FormControl>
                                                            </FormItem>
                                                      )}
                                                />
                                          </CardDescription>
                                          <CardFooter className="flex justify-center items-center">
                                                <Button type="submit">submit</Button>
                                          </CardFooter>
                                    </form>
                              </Form>
                        </CardContent>
                  </Card>
                  <Status />
            </div>
      );
};

export default Signup;
