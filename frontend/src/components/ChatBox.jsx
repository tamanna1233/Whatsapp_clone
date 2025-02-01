import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';
import { Phone } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';import { Plus } from 'lucide-react';
const ChatBox = () => {
  return (
    <>
      <Card>
        <div className='px-2 grid grid-cols-2 pt-1   '>
        <div className='flex gap-3 justify-start '> 
            <div>q</div>
            <h2>Name</h2>
        </div>
        <div className='flex  justify-end pt-0 '>
          <Button className='bg-white text-black hover:bg-slate-300 border-none rounded-full shadow-none'><Phone/></Button>
          <Button className='bg-white text-black hover:bg-slate-300 border-none rounded-full shadow-none'><Search/></Button>
          <Button className='bg-white text-black hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none'><EllipsisVertical/></Button>
          </div>
        </div>
          <Card className='bg-gray-400 p-8 h-full w-full  mt-2'>
</Card>
          <div>
            <div className='flex gap-2 p-2 '>
<Plus className='pt-2 size-8'/>
              <Input/>
<Button className='bg-white text-black hover:bg-green-700 hover:text-white '><SendHorizontal size={24}/></Button>
            </div>
            
          </div>
      </Card>
    </>
  )
}

export default ChatBox
