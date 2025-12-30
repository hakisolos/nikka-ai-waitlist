import express from 'express'
import { config } from "dotenv";
import { ConDb } from './src/db.js';
import { isValidEmail, sendWaitlistMail } from './src/utils.js';
import { Waitlist } from './src/models/waitlist.js';
import cors from 'cors';
config()

const app = new express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    return res.json({message: "waitlist api running"})
})


app.post("/api/join", async(req, res) => {
    const {name, email} = req.body;

    if(!name || !email) {
        return res.status(400).json({error: "bad request"})
    }
    if(!isValidEmail(email)) {
        return res.status(400).json({error: "Invalid email"}) 
    }
    try{

        const existUsr = await Waitlist.findOne({email})
        if(existUsr){
            return res.status(409).json({message: "user already joined wailist"})
        }
        const _ = await Waitlist.create(
            {
                name,
                email
            }
        )
        await sendWaitlistMail(email, name)
        return res.status(200).json({message: "User added to waitlist"})
    }catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})


app.get("/waitlist", async(req, res) => {
    try{
        const usr = await Waitlist.find()
        if(!usr){
            return res.json({message: "no user joined yet"})
        }
        return res.json({data: usr})
    }catch(e){
        console.log(e)
        return res.status(500).json({error: e})
    }
})

app.listen(PORT, () => {
    ConDb()
    console.log(`waitlist app running on http://localhost:${PORT}`)
})