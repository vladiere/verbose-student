import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { UserForCreate, UserForLogin, UserForUpdate } from '../models/auth.model';

const register = async (req: Request, res: Response) => {
  try {
    const user: UserForCreate = req.body;
    const result = await authService.register(user);
    return res.status(201).json(result);
  } catch (error: any) {
    console.error(`Registration Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const login: UserForLogin = req.body;

    console.log(login)
    const user = await authService.login(login);
    return res.status(200).json({ user });
  } catch (error: any) {
    console.error(`Login Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = await authService.logout(refreshToken);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(`Logging out librarian in controller Error: ${error}`);
    throw new Error(error);
  }
};

const changePass = async (req: Request, res: Response) => {
  try {
    const user: UserForUpdate = req.body;
    const result = await authService.changeUserPassword(user);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(`Changing password in controller Error: ${error}`);
    return res.status(500).json(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const result = await authService.getUserById(parseInt(user_id));

    return res.status(200).json(result);
  } catch (error) {
    console.error(`Getting user by id error: ${error}`);
    return res.status(500).json(error);
  }
}

export default {
  login,
  register,
  logout,
  changePass,
  getUserById,
};
