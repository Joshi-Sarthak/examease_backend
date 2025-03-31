import mongoose from "mongoose"

interface Option {
	optionText: string
	optionNumber: number
	questionId: string
}

interface Question {
	questionText: string
	questionNumber: number
	options: Option[]
	testId: string
	correctOptionIndex: number
}

interface Result {
	studentId: string
	result: number
}

const questionSchema = new mongoose.Schema<Question>({
	questionText: { type: String, required: true },
	questionNumber: { type: Number, required: true },
	options: {
		type: [
			new mongoose.Schema<Option>({
				optionText: { type: String, required: true },
				optionNumber: { type: Number, required: true },
				questionId: { type: String, required: true },
			}),
		],
		required: true,
	},
	testId: { type: String, required: true },
	correctOptionIndex: { type: Number, required: true },
})

const ResultSchema = new mongoose.Schema<Result>({
	studentId: { type: String, required: true },
	result: { type: Number, required: true },
})

const testSchema = new mongoose.Schema({
	testName: { type: String, required: true },
	questions: { type: [questionSchema], required: true },
	postedAt: { type: Date, default: Date.now },
	startFrom: { type: Date, required: true },
	deadlineTime: { type: Date, required: true },
	testTime: { type: Number, required: true },
	result: { type: [ResultSchema], required: true },
	classroomId: { type: String, required: true },
})

export const User = mongoose.models?.Test || mongoose.model("User", testSchema)
