import { Router } from "express"
import {
  registerUser,
  getAllUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deactivateUser,
  loginUser,
} from "../controllers/user.controller"

const router = Router()

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.get("/users", getAllUsers)
router.put("/users/:userId", updateUser)
router.get("/users/:emailId", getUserByEmail)
router.get("/users/id/:userId", getUserById)
router.delete("/users/:userId", deactivateUser)

export default router
