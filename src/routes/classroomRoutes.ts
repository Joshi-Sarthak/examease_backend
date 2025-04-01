import express from "express"
import {
	getClassroomsForStudent,
	getClassroomsForTeacher,
	deleteClassroom,
	leaveClassroom,
	createClassroom,
	joinClassroom,
	getClassroomByCode,
	getStudentNames,
} from "../controllers/classroomController.js"

const router = express.Router()

router.get("/student/:userId", getClassroomsForStudent)
router.get("/teacher/:userId", getClassroomsForTeacher)
router.post("/create", createClassroom)
router.post("/join", joinClassroom)
router.get("/code/:id", getClassroomByCode)
router.post("/leave", leaveClassroom)
router.delete("/delete/:userId/:classroomId", deleteClassroom)
router.post("/student-list", getStudentNames)

export { router as classroomRoutes }
