import { Request, Response } from "express";
import User from "../models/user";
import UserService from "../service/user.service";

const userService = new UserService();
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.params?.userId;
    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) {
       res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(updatedUser);
    }

  } catch (error) {
    res.status(500).json({ error: "user not found" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req?.params?.userId;
    const user = await userService.getUserById(userId); // Uses the primary key

    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req?.params?.emailId;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.params?.userId;
    const user = await userService.deactivateUser(userId);

    if (user) {
      res
        .status(200)
        .json({ data: `User with ID ${userId} is now been deactivated.` });
    } else {
      res.status(404).json({ error: "User not found or already hidden." });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
