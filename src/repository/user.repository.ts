import User from "../models/user";

class UserRepository {
  async createUser(data: any) {
    const user = await User.create(data);
    return user;
  }

  async getAllUsers() {
    const users = await User.findAll({
      where: { status: "active" },
    });
    return users;
  }

  async getUserById(userId: string) {
    const user = await User.findByPk(userId); // Uses the primary key
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
    });
    return user;
  }

  async updateUser(userId: string, data: any) {
    const [updated] = await User.update(data, {
      where: { user_id: userId },
    });
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return updatedUser;
    }
  }

  async deactivateUser(userId: string) {
    const [updated] = await User.update(
      { status: "inactive" },
      {
        where: { user_id: userId },
      }
    );
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return updatedUser;
    }
  }
}

export default UserRepository;
