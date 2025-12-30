import { Schema, model } from "mongoose";


const WaitlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

export const Waitlist = model("Waitlist", WaitlistSchema)