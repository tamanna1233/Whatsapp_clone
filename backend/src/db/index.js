import mongoose from 'mongoose';
import {dbname} from '..constant.js'

const dbconnect= async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.dburl}/${dbname}`)
console.log('database connected')}
catch(error){
    console.log('db not connected',error)
};
}
export default dbconnect;