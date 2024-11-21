import UserRepository from "../repository/user.repository";
import { BaseError } from "../utils/error";

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: any) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      return users;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      return user;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async updateUser(userId: string, data: any) {
    try {
      const user = await this.userRepository.updateUser(userId, data);
      return user;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async deactivateUser(userId: string) {
    try {
      const user = await this.userRepository.deactivateUser(userId);
      return user;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }
}

export default UserService;
