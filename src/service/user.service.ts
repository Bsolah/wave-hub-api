import UserRepository from "../repository/user.repository";

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: any) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {}
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      return users;
    } catch (error) {}
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      return user;
    } catch (error) {}
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {}
  }

  async updateUser(userId: string, data: any) {
    try {
      const user = await this.userRepository.updateUser(userId, data);
      return user;
    } catch (error) {}
  }

  async deactivateUser(userId: string) {
    try {
      const user = await this.userRepository.deactivateUser(userId);
      return user;
    } catch (error) {}
  }
}

export default UserService;
