import express from "express"
import {
	createTest,
	editTest,
	deleteTest,
	getTestById,
	getTestResults,
	getDetailedTestResults,
	submitTestResult,
} from "../controllers/testController.js"

const router = express.Router()

router.post("/create", createTest)
router.put("/edit", editTest)
router.delete("/delete/:testId/:teacheId", deleteTest)
router.get("/get/:testId", getTestById)
router.get("/results/:testId", getTestResults)
router.get("/detailed-results/:testId", getDetailedTestResults)
router.post("/submit-result", submitTestResult)

export { router as testRoutes }
