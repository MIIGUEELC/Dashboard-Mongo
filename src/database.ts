import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import Auth from "./models/authModel";
import { bookingSeed, contactSeed, roomSeed, userSeed } from "./seed/seed";
import Booking from "./models/bookingModel";
import Contact from "./models/contactModel";
import User from "./models/userModel";
import Room from "./models/roomModel";
import { authSchema } from "./models/authModel";
import { getAllBookings } from "./controllers/bookingController";

dotenv.config();



const url = "mongodb+srv://miigueel9219:LVSEiCmwhZ2RDvTy@miguel.516oc.mongodb.net/Hotel_Miranda?retryWrites=true&w=majority&appName=Miguel";
// cambiar la url a la .env

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB connected: ${conn.connection.host}`);

       
        await Booking.insertMany(bookingSeed);
        await Contact.insertMany(contactSeed);
        await Room.insertMany(roomSeed);
        await User.insertMany(userSeed);


    } catch (error) {
        console.log('Error connection to MongoDB: ' + error);
        process.exit(1);
    }
}

export default connectDB;