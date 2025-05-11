import mongoose from "mongoose";

export const connectToDatabase = async () => {

    const db = process.env.MONGODB_URL
    try {
        if (db) {
            mongoose.connect(db)
            console.log("Successfully Connected");
        }

    } catch (error) {
        if (!db) {
            throw new Error("Error connecting to mongo db")
        }
    }
}