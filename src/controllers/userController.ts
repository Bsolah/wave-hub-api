import { Request, Response } from 'express';
import  User  from '../models/user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        const err =  error as Error
        res.status(500).json({ error: err.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll({
            where: { status: 'active' },  
          });
        res.status(200).json(users);
    } catch (error) {
        const err =  error as Error
        res.status(500).json({ error: err.message });
    }
};

// export const getUserById = async (req: Request, res: Response) => {
//     try {
//       const userId = req?.params?.userId;  
//       console.log('req ', req.params)
//       const user = await User.findByPk(userId);  // Uses the primary key
//       if (!user) {
//         res.status(404  ).json({ error: 'user not found'});
//       }
//       res.status(200).json(user);
//     } catch (error) {
//         const err =  error as Error
//         res.status(500).json({ error: err.message });
//     }
//   }
  
  export const  updateUser = async (req: Request, res: Response) => {

    try {
        const userId  = req?.params?.userId;
        const { first_name, last_name, email, password } = req?.body;
        const data = { first_name, last_name, email, password };
      const [updated] = await User.update(data, {
        where: { user_id: userId },
      });
      if (updated) {
        const updatedUser = await User.findByPk(userId);
        res.status(200).json(updatedUser);
      }
      res.status(404).json({ error: 'user not found'});
    } catch (error) {
        res.status(500).json({ error: 'user not found'});

    }
  }

  export const getUserById = async (req: Request, res: Response)  => {
    try {
        const userId = req?.params?.userId;  
        const user = await User.findByPk(userId);  // Uses the primary key

      if (!user) {
        res.status(500).json({ error: 'user not found'});
      }
      res.status(200).json(user);
    } catch (error) {
        const err =  error as Error
        res.status(500).json({ error: err.message });
    }
  }

  export const getUserByEmail = async (req: Request, res: Response)  => {
    try {
        const email = req?.params?.emailId;  

      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        res.status(500).json({ error: 'user not found'});
      }
      res.status(200).json(user);
    } catch (error) {
        const err =  error as Error
        res.status(500).json({ error: err.message });
    }
  }
  

  export const  deactivateUser  = async (req: Request, res: Response) => {
    try {
        const userId = req?.params?.userId;  
      const [updated] = await User.update(
        { status: 'hidden' },  
        { where: { user_id: userId } }
      );
  
      if (updated) {
        console.log();
        res.status(200).json({ data: `User with ID ${userId} is now been deactivated.`});
      } else {
        res.status(404).json({ error: 'User not found or already hidden.'});
      }
    } catch (error) {
        const err =  error as Error
        res.status(500).json({ error: err.message });
    }
  }
  
  
