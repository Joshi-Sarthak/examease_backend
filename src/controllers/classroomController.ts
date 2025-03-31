import { Request, Response } from "express"
import { Classroom } from "../models/classroomModel.js"

export const getClassroomsForStudent = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body

		if (!userId) {
			return res.status(400).json({ error: "User ID is required" })
		}

		const classrooms = await Classroom.find({ students: userId })

		res.json({ classrooms })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}
