import { Router } from "express"
import { editUser, deleteUser } from "../controllers/userController.js"

const router = Router()

router.put("/edit", editUser)
router.delete("/delete", deleteUser)

export { router as userRoutes }
