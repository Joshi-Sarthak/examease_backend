import { Request, Response } from "express"
import { User } from "../models/userModel.js"

export const editUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const userId = req.body
		const updates = req.body

		const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true })

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" })
		}

		res.json({ message: "User updated successfully", user: updatedUser })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId } = req.body

		const deletedUser = await User.findByIdAndDelete(userId)

		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" })
		}

		res.json({ message: "User deleted successfully" })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}
