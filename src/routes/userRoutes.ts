import { Router } from "express"
import {
  createUser,
  getAllUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deactivateUser,
} from "../controllers/user.controller"

const router = Router()

router.post("/user", createUser)
router.get("/users", getAllUsers)
router.put("/user/:userId", updateUser)
router.get("/user/:emailId", getUserByEmail)
router.get("/user/id/:userId", getUserById)
router.delete("/user/:userId", deactivateUser)

export default router
