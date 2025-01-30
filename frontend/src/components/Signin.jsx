import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Form , FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { authstore } from '@/store/authstore'
import { Link } from 'react-router'

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
    <Card className='m-20 p-8 bg-black rounded-3xl'>
        <CardContent className='p-0 items-center'>
<CardTitle className='text-white text-xl text-center pt-5'>Wellcome in Whatsapp</CardTitle>
<CardHeader className='text-white text-center'>if you don't have an account please <Link to= '/signup'>Signup</Link> </CardHeader>
<Form {...form}>
    <form
    onSubmit={form.handleSubmit(onSubmit)}
    >
        <FormField
        name="phoneNo"
        control={form.control}
        rules={{required:'mobile no is required'}}
        render={({field})=>(
            <FormItem className='flex justify-center'>
                <FormControl>
                <Input placeholder="Enter Mobile no..." {...field} className='text-white text-lg w-80 p-6  border-2 rounded-2xl'/>
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
            <FormItem className='flex justify-center'>
                <FormControl>
                    <Input placeholder="Enter password..."{...field} type='password' className='text-white w-80 p-6 border-2 rounded-2xl'/>
                </FormControl>
            </FormItem>
        )}
        />

<div className='pt-4 flex justify-center'>  
          <Button type="submit" className='w-20 text-lg hover:bg-white hover:text-black '>SignIn</Button>
</div>    </form>
</Form>

</CardContent>
    </Card>
      </>
  )
}

export default Signin
