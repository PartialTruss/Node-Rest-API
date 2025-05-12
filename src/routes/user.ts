// // routes/users.ts
// import express, { Request, Response } from "express";
// import User from "../models/user.ts";

// const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//     try {
//         const { name, email, password, balance, imageUrl, color } = req.body;

//         if (!name || !email || !password || balance === undefined || !color) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ error: "User with this email already exists" });
//         }

//         const user = new User({
//             name,
//             email,
//             balance,
//             imageUrl,
//             color,
//             passwordHash: "", // Required for the schema
//             passwordSalt: ""  // Not used here, but required in schema
//         });

//         await user.setPassword(password);

//         await user.save();

//         return res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 balance: user.balance,
//                 imageUrl: user.imageUrl,
//                 color: user.color
//             }
//         });

//     } catch (error) {
//         console.error("User creation error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

// export default router;

import express, { Request, Response } from "express"
import User from "../models/user.ts"

const router = express.Router()


router.post("/", async (req: Request, res: Response) => {
    try {

        const { name, email, balance, imageUrl, color, password } = req.body

        if (!name || !email || !balance || !imageUrl || !color) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const userExisted = await User.findOne({ email })

        if (!userExisted) {
            return res.status(400).json({ error: "user with this email already exists" })
        }

        const user = new User({
            name,
            email,
            balance,
            imageUrl,
            color,
            passwordHash: "",
            passwordSalt: ""
        })

        await user.setPassword(password)

        await user.save()

        return res.status(201).json({
            message: "User created successfully", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                color: user.color,

            }
        })



    } catch (error) {

    }
})