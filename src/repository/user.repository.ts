import User from "../models/user"
import { IUser } from "../types"

class UserRepository {
  async createUser(data: IUser) {
    const user: IUser = await User.create({ ...data })
    return user
  }

  async getAllUsers() {
    const users: IUser[] = await User.findAll({
      where: { status: "active" },
    })
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
