import User from "../models/user"
import bcrypt from "bcrypt"
import { IUser } from "../types"

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10 // You can increase this value for stronger hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

const comparePassword = async (
  inputPassword: string,
  storedHash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(inputPassword, storedHash)
  return isMatch
}

class UserRepository {
  async registerUser(data: IUser) {
    const { email, password_hash, first_name, last_name } = data

    // Hash the password
    const hashedPassword = await hashPassword(password_hash)

    const user = await User.create({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
    })
    return user
  }

  async loginUser(email: string, password_hash: string) {
    // Find user by email
    const user = await User.findOne({ where: { email } })

    // Compare the entered password with the hashed password
    const isMatch = await comparePassword(
      password_hash,
      user?.password_hash || "",
    )

    if (isMatch) {
      return { isMatch, message: "Login successful" }
    }
  }

  async getAllUsers() {
    const users: IUser[] = await User.findAll()
    return users
  }

  async getUserById(userId: string) {
    const user: IUser | null = await User.findByPk(userId) // Uses the primary key
    return user
  }

  async getUserByEmail(email: string) {
    const user: IUser | null = await User.findOne({
      where: { email: email },
    })
    return user
  }

  async updateUser(userId: string, data: IUser) {
    const [updated] = await User.update(data, {
      where: { user_id: userId },
    })
    if (updated) {
      const updatedUser: IUser | null = await User.findByPk(userId)
      return updatedUser
    }
  }

  async deactivateUser(userId: string) {
    const [updated] = await User.update(
      { status: "inactive" },
      {
        where: { user_id: userId },
      },
    )
    if (updated) {
      const updatedUser: IUser | null = await User.findByPk(userId)
      return updatedUser
    }
  }
}

export default UserRepository
