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

// Create a new test
router.post("/create", createTest)

// Edit an existing test
router.put("/edit", editTest)

// Delete a test
router.delete("/delete", deleteTest)

// Get test by ID
router.get("/get/:testId", getTestById)

// Get test results summary
router.get("/results/:testId", getTestResults)

// Get detailed test results
router.get("/detailed-results/:testId", getDetailedTestResults)

// Submit test result
router.post("/submit-result", submitTestResult)

export { router as testRoutes }
