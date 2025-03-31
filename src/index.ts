import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { authRoutes } from "./routes/authRoutes.js"
import { userRoutes } from "./routes/userRoutes.js"
import { classroomRoutes } from "./routes/classroomRoutes.js"
import { testRoutes } from "./routes/testRoutes.js"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:4200"],
	})
)

app.get("/", (req, res) => {
	res.json({ msg: "OK" })
})

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/classroom", classroomRoutes)
app.use("/test", testRoutes)

mongoose
	.connect(process.env.MONGO_URI!)
	.then((res) => {
		console.log("connected to DB")
		app.listen(PORT, () => {
			console.log("listening on port ", PORT)
		})
	})
	.catch((err) => {
		console.log(err)
	})
