import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Plus } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { authstore } from '@/store/authstore';
const Status = () => {
    const {authUser} = authstore()
    console.log(authUser)
    console.log("hlo")
  return (
    <>
      <Card className=' m-0 p-0 text-white bg-slate-800 w-full'>
        <CardHeader className='flex flex-row justify-between  bg-slate-900'>
            <CardTitle><h2>Status</h2></CardTitle>
            <div className='flex gap-3'><Plus size={24} />
            <EllipsisVertical/></div>
</CardHeader>
<CardContent className=' bg-slate-900'>
<div className='flex gap-2'>
    
<div className='h-16 w-16 rounded-full '>
      <img src=
      {authUser?.profilePic?.url} 
      alt=""  className='bg-transparent h-16 w-16 rounded-full object-cover'/> <div className='bg-teal-900 translate-x-8  h-6 w-6 rounded-full '><Plus className='text-white' size={22}/></div> 
</div>    
<div> <b>My Status</b>
    <p>Click to add status update</p>
    </div>
</div>
</CardContent>
<Separator/>
<CardDescription className='bg-slate-900'>
    <ScrollArea className='h-96 p-2 my-4'>
        <h1 className='text-green-600 text-lg'>Recent</h1>
      
    </ScrollArea>
</CardDescription>

      </Card>
    </>
  )
}

export default Status
