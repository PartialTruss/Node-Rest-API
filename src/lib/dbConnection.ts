import mongoose from "mongoose"

export const connectToDatabase = async () => {
    const db = (await mongoose.connect(process.env.MONGODB_URL as string)).connection

    db.on("error", console.error.bind(console, "connection error")
    )

    db.once("open", () => {
        console.log("connected")

    })
    return db
}