import { Request, Response } from "express";
import User from "../models/user.ts";

export const getUser = async (req: Request, res: Response) => {

    try {

        const { id } = req.body

        const users = await User.findOne({ id })
        return res.status(200).json({ users })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, balance, imageUrl, color } = req.body;

        if (!name || !email || !password || balance === undefined || !color) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        const user = new User({
            name,
            email,
            balance,
            imageUrl,
            color,
            passwordHash: "", // Required for the schema
            passwordSalt: ""  // Not used here, but required in schema
        });

        await user.setPassword(password);

        await user.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                imageUrl: user.imageUrl,
                color: user.color
            }
        });

    } catch (error) {
        console.error("User creation error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}