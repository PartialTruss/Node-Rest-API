import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    name: string
    email: string
    balance: number
    imageUrl: string
    color: string
    setPassword: (password: string) => void
    validatePassword: (password: string) => boolean
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    color: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: false }
})

UserSchema.methods.setPassword = async function (password: string): Promise<void> {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(password, saltRounds);
};


UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash)
}

export default mongoose.model<User>("User", UserSchema)