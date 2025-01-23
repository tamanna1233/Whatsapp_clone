import app from "./app.js"
import {dbconnect} from "../src/db/index.js"
dbconnect().then(()=>{
    const port=process.env.PORT||5000
    app.listen(port,()=>{
        console.log(`app listen on ${port}`)
    })
})
.catch((err)=>{
console.log("something went wrong  " ,err)
})