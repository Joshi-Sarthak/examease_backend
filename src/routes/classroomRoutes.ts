import express from "express"
import {
	getClassroomsForStudent,
	getClassroomsForTeacher,
	deleteClassroom,
	leaveClassroom,
	createClassroom,
	joinClassroom,
	getClassroomByCode,
} from "../controllers/classroomController.js"

const router = express.Router()

// Get all classrooms a student is part of
router.post("/student", getClassroomsForStudent)

// Get all classrooms a teacher owns
router.post("/teacher", getClassroomsForTeacher)

// Create a classroom
router.post("/create", createClassroom)

// Join a classroom
router.post("/join", joinClassroom)

// Get a classroom by code
router.post("/code", getClassroomByCode)

// Leave a classroom
router.post("/leave", leaveClassroom)

// Delete a classroom
router.post("/delete", deleteClassroom)

export default router
