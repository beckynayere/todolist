import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from '../models/user-model';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Types } from 'mongoose';

dotenv.config();

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in createUser:", error);
    return response.status(500).send({ message: "Internal server error" });
  }
};

const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordIdentical) {
      return response.status(401).send({ message: "Incorrect password" });
    }

    const token = getUserToken(existingUser._id);

    return response.status(200).send({
      token,
      user: {
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return response.status(500).send({ message: "Internal server error" });
  }
};

export { createUser, loginUser };
