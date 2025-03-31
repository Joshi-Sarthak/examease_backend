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

router.get("/student/:userId", getClassroomsForStudent)
router.get("/teacher/:userId", getClassroomsForTeacher)
router.post("/create", createClassroom)
router.post("/join", joinClassroom)
router.get("/code/:id", getClassroomByCode)
router.post("/leave", leaveClassroom)
router.delete("/delete/:userId/:classroomId", deleteClassroom)

export { router as classroomRoutes }
