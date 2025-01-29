import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Signup from './Signup'
import { Form , FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { authstore } from '@/store/authstore'

const Signin = () => {
    const form =useForm({
        defaultValues:{
        phoneNo:"",
        password:""
        }
    })
    const {login} = authstore()
    const onSubmit = async(data)=>{
        console.log(data)
        const res = await login(data)
        console.log(res.data)
        if(res.data.success === true){
            console.log('login successful')
        }

    }
  return (
    <>
    <Card className='m-20 bg-black'>
        <CardContent className='items-center'>
<CardTitle className='text-white text-xl text-center pt-5'>Wellcome in Whatsapp</CardTitle>
<CardHeader className='text-white text-center'>if you don't have an account please <a href={<Signup/>}>Signup</a></CardHeader>
<Form {...form}>
    <form
    onSubmit={form.handleSubmit(onSubmit)}
    >
        <FormField
        name="phoneNo"
        control={form.control}
        rules={{required:'mobile no is required'}}
        render={({field})=>(
            <FormItem>
                <FormControl>
                <Input placeholder="Enter Mobile no..." {...field} />
                </FormControl>
            </FormItem>
        )}
        />
        <br />
        <FormField
        name='password'
        control={form.control}
        rules={{required:'password is required'}}
        render={({field})=>(
            <FormItem>
                <FormControl>
                    <Input placeholder="Enter password..."{...field}/>
                </FormControl>
            </FormItem>
        )}
        />

<div className='pt-4 flex justify-center'>        <Button type="submit" className=' hover:bg-white hover:text-black '>SignIn</Button>
</div>    </form>
</Form>

</CardContent>
    </Card>
      </>
  )
}

export default Signin
