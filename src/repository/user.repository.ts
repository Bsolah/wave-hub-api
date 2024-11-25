import User from "../models/user";
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {

  const saltRounds = 10;  // You can increase this value for stronger hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (inputPassword: string, storedHash: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch;
};


class UserRepository {
  async registerUser(data: any) {
    const { email, password_hash, first_name, last_name } = data;

    // Hash the password
    const hashedPassword = await hashPassword(password_hash);

    const user = await User.create({
        email,
        password_hash: hashedPassword,
        first_name,
        last_name
      });    
      return user;
  }

  async loginUser(data: any) {

      const { email, password_hash } = data;
      
      // Find user by email
      const user = await User.findOne({ where: { email } });
      
      // Compare the entered password with the hashed password
      const isMatch = await comparePassword(password_hash, user?.password_hash || '');
      
      if (isMatch) {
        return {isMatch, message: 'Login successful'}
      }
  };

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
