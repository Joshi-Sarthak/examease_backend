import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { User } from "../models/userModel.js"

import { Request, Response } from "express"
dotenv.config()

const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, username, email, password } = req.body

		// Check if the user already exists
		const existingUser = await User.findOne({ $or: [{ email }, { username }] })
		if (existingUser) {
			return res.status(400).json({ error: "Email or username already in use" })
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		// Create new user
		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		})
		await newUser.save()

		res.status(201).json({ message: "User registered successfully", user: newUser })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		// Check if the user exists
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" })
		}

		// Validate password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid email or password" })
		}

		res.status(200).json({ message: "Login successful", user })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export { signup, login }
