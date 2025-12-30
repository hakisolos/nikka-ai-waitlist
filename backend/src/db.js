import mongoose from "mongoose";
import { config } from "dotenv";
config()
export function ConDb(){
   mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('database connected')
    })
    .catch((e) => {
        console.error(e)
    })
}