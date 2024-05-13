/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import { generateRandomString } from '../utils/generator.util.js';
import authService from "../services/auth.service.js";
import config from "../config/app.config.js";

const register = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;
    const result = await authService.register(fullname, username, password);
    return res.status(201).json(result);
  } catch (error) {
    console.error(`Registration Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Login Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Logging out librarian in controller Error: ${error}`);
    throw new Error(error);
  }
};

const changePass = async (req, res) => {
  try {
    const user = req.body;
    const result = await authService.changeUserPassword(user);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Changing password in controller Error: ${error}`);
    return res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const result = await authService.getUserById(parseInt(user_id));
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Getting user by id error: ${error}`);
    return res.status(500).json(error);
  }
};

export default {
  login,
  register,
  logout,
  changePass,
  getUserById,
};
