import UserRepository from "../repository/user.repository"
import { IUser } from "../types"
import { BaseError } from "../utils/error"

class UserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }

  async registerUser(data: IUser) {
    try {
      const user = await this.userRepository.registerUser(data)
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async loginUser(data: IUser) {
    try {
      const user = await this.userRepository.loginUser(
        data.email,
        data.password_hash,
      )
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers()
      return users
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.getUserById(userId)
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email)
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async updateUser(userId: string, data: IUser) {
    try {
      const user = await this.userRepository.updateUser(userId, data)
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async deactivateUser(userId: string) {
    try {
      const user = await this.userRepository.deactivateUser(userId)
      return user
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }
}

export default UserService
