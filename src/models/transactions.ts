import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface Transactions extends Document {
    description: string
    total: number
    date: Date
    user: ObjectId
    business: string
    items: { title: string, price: number, quantity: number }[]
}

const TransactionSchema: Schema = new Schema({
    description: { type: String, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: String, required: true },
    items: [{ title: { type: String, required: true }, price: { type: Number, required: true }, quantity: { type: Number, required: true } }]
})

export default mongoose.model<Transactions>("Transactions", TransactionSchema)