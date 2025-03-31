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

const testSchema = new mongoose.Schema({
	testName: { type: String, required: true },
	questions: { type: [questionSchema], required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

export const User = mongoose.models?.Test || mongoose.model("User", testSchema)
