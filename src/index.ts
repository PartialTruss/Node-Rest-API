import bodyParser from "body-parser"
import "dotenv/config"
import express from "express"
import { connectToDatabase } from "./lib/dbConnection.ts"
const transactionsRouter = await import("./routes/transactions.ts")


const start = async () => {

    await connectToDatabase

    const app = express()

    app.use(bodyParser.json())

    app.use("/transactions", transactionsRouter.default)

    app.get("/", (request, response) => {
        response.send("Hello")
    })

    app.listen(process.env.HTTP_PORT, () => {
        console.log(`Server is running on port ${process.env.HTTP_PORT}`);

    })
}

start()