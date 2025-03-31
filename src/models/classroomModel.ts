import mongoose from "mongoose"

const classroomSchema = new mongoose.Schema({
	classroomName: { type: String, required: true },
	classroomCode: { type: String, required: true, unique: true },
	teacherId: { type: String, required: true },
	teacherName: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	students: [{ type: String }],
})

export const User =
	mongoose.models?.Classroom || mongoose.model("User", classroomSchema)
