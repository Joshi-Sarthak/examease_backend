import { Request, Response } from "express"
import { Test } from "../models/testModel.js"
import { Classroom } from "../models/classroomModel.js"
import { User } from "../models/userModel.js"

interface Result {
	studentId: string
	result: number
}

export const createTest = async (req: Request, res: Response): Promise<any> => {
	try {
		const {
			testName,
			questions,
			startFrom,
			deadlineTime,
			testTime,
			classroomId,
			teacherId,
		} = req.body

		if (
			!testName ||
			!questions ||
			!startFrom ||
			!deadlineTime ||
			!testTime ||
			!classroomId ||
			!teacherId
		) {
			return res.status(400).json({ error: "All fields are required" })
		}

		// Check if the classroom exists and the user is the teacher
		const classroom = await Classroom.findById(classroomId)

		if (!classroom) {
			return res.status(404).json({ error: "Classroom not found" })
		}

		if (classroom.teacherId !== teacherId) {
			return res.status(403).json({
				error: "You are not authorized to create a test for this classroom",
			})
		}

		const newTest = new Test({
			testName,
			questions,
			startFrom,
			deadlineTime,
			testTime,
			classroomId,
			result: [],
		})

		await newTest.save()

		res.json({ message: "Test created successfully", test: newTest })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const editTest = async (req: Request, res: Response): Promise<any> => {
	try {
		const {
			testId,
			testName,
			questions,
			startFrom,
			deadlineTime,
			testTime,
			teacherId,
		} = req.body

		if (
			!testId ||
			!testName ||
			!questions ||
			!startFrom ||
			!deadlineTime ||
			!testTime ||
			!teacherId
		) {
			return res.status(400).json({ error: "All fields are required" })
		}

		const test = await Test.findById(testId)

		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		const classroom = await Classroom.findById(test.classroomId)

		if (!classroom) {
			return res.status(404).json({ error: "Classroom not found" })
		}

		if (classroom.teacherId !== teacherId) {
			return res
				.status(403)
				.json({ error: "You are not authorized to edit this test" })
		}

		test.testName = testName
		test.questions = questions
		test.startFrom = startFrom
		test.deadlineTime = deadlineTime
		test.testTime = testTime

		await test.save()

		res.json({ message: "Test updated successfully", test })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const deleteTest = async (req: Request, res: Response): Promise<any> => {
	try {
		const { testId, teacherId } = req.params

		if (!testId || !teacherId) {
			return res
				.status(400)
				.json({ error: "Test ID and Teacher ID are required" })
		}

		const test = await Test.findById(testId)

		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		const classroom = await Classroom.findById(test.classroomId)

		if (!classroom) {
			return res.status(404).json({ error: "Classroom not found" })
		}

		if (classroom.teacherId !== teacherId) {
			return res
				.status(403)
				.json({ error: "You are not authorized to delete this test" })
		}

		await Test.findByIdAndDelete(testId)

		res.json({ message: "Test deleted successfully" })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const getTestById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { testId } = req.params

		if (!testId) {
			return res.status(400).json({ error: "Test ID is required" })
		}

		const test = await Test.findById(testId)

		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		res.json({ test })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const getTestResults = async (req: Request, res: Response): Promise<any> => {
	try {
		const { testId } = req.params

		if (!testId) {
			return res.status(400).json({ error: "Test ID is required" })
		}

		const test = await Test.findById(testId)

		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		const scores = test.result.map((r: Result) => r.result)
		const totalStudents =
			(await Classroom.findById(test.classroomId))?.students.length || 0
		const studentsAttempted = scores.length
		const notAttempted = totalStudents - studentsAttempted
		const avgScore = studentsAttempted
			? scores.reduce((a: number, b: number) => a + b, 0) / studentsAttempted
			: 0
		const highestScore = Math.max(...scores, 0)
		const lowestScore = Math.min(...scores, 0)

		res.json({
			avgScore,
			lowestScore,
			highestScore,
			studentsAttempted,
			totalStudents,
			notAttempted,
		})
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const getDetailedTestResults = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { testId } = req.params

		if (!testId) {
			return res.status(400).json({ error: "Test ID is required" })
		}

		const test = await Test.findById(testId)

		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		const studentResults = await Promise.all(
			test.result.map(async (r: Result) => {
				const student = await User.findById(r.studentId)
				return {
					studentName: student ? student.name : "Unknown",
					score: r.result,
					totalQuestions: test.questions.length,
					percentage: (r.result / test.questions.length) * 100,
				}
			})
		)

		res.json({ results: studentResults })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

export const submitTestResult = async (req: Request, res: Response): Promise<any> => {
	try {
		const { testId, studentId, result } = req.body

		if (!testId || !studentId || result === undefined) {
			return res
				.status(400)
				.json({ error: "Test ID, Student ID, and result are required" })
		}

		const test = await Test.findById(testId)
		if (!test) {
			return res.status(404).json({ error: "Test not found" })
		}

		test.result.push({ studentId, result })
		await test.save()

		res.json({ message: "Test result submitted successfully" })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}
