import express, { Request } from "express"
import { Transactions } from "./types"


const router = express.Router()

router.post("/", async (req: Request & {
    body: Transactions
}) => {
    try {

        const { user, total, description, date, business, items } = req.body

    } catch (error) {
        console.error("Error occured", error);

    }
})


export default router