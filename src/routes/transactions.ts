import express, { Request, Response } from "express"
import Transactions from "../models/transactions.ts"
import User from "../models/user.ts"
import { TransactionsBody } from "./types.ts"


const router = express.Router()


router.get("/", async (req: Request, res: Response) => {

    try {

        const transactions = await Transactions.find()
        return res.status(200).json({ transactions })

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" })
    }
})


router.post("/", async (req: Request<{}, {}, TransactionsBody>, res: Response) => {
    try {

        const { user, total, description, date, business, items } = req.body

        if (!user || !description || !total || !date || !business || !items) {

            return res.status(400).json({ error: "Missing required fields" })

        }

        if (!Number.isInteger(total)) {
            return res.status(400).json({ error: "Total must be number" })

        }

        if (!Array.isArray(items)) {
            return res.status(400).json({ error: "Items must be array" })

        }

        if (items.length > 0) {
            const InvalidItem = items.find(item => {
                return (
                    typeof item.title !== 'string' || item.title.trim() === '' ||
                    typeof item.price !== 'number' || isNaN(item.price) ||
                    typeof item.quantity !== 'number' || isNaN(item.quantity)
                );
            });


            if (InvalidItem) {
                return res.status(400).json({ error: "Items must have title, price and quantity" })

            }
        }

        const userDoc = await User.findById(user)

        if (!userDoc) {
            return res.status(400).json({ error: "User not found!" })

        }

        const transactionsDoc = new Transactions({
            user,
            total,
            description,
            date,
            business,
            items
        })

        await transactionsDoc.save()

        userDoc.balance += total
        await userDoc.save()

        return res.status(201).json({
            message: "Created successfully!",
            transactions: {
                id: transactionsDoc._id,
                user: transactionsDoc.user,
                total: transactionsDoc.total,
                description: transactionsDoc.description,
                date: transactionsDoc.date,
                business: transactionsDoc.business,
                items: transactionsDoc.items
            }
        });



    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })

    }
})


export default router