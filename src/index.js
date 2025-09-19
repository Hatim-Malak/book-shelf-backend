import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connectdb} from "./lib/db.js"
import cookieParser from "cookie-parser"
import bookRoutes from "./routes/book.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT
const allowedOrigin = [
    "http://localhost:5173",
    "https://book-shelf-tan.vercel.app"
]

app.use(cookieParser())
app.use(cors({
    origin:allowedOrigin,
    credentials:true,
}))
app.use(express.json({limit:"5mb"}))
app.use(express.json())
app.use("/books",bookRoutes)

app.listen(PORT,()=>{
    console.log("The server is running at the port",PORT)
    connectdb();
})