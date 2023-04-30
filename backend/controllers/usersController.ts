import { User } from "../models/user";
import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
