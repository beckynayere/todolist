import { Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import User from "../models/user-model";
import dotenv from "dotenv";

dotenv.config(); 

const createUser = async (request:Request, response:Response) => {
try {
    const {name, email, password} = request.body;

    const exsistingUser = await User.findOne({email});
    if (exsistingUser) {
        return response.status(409).send ("user already exsist");
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create ({
        name,
        email,
        password:hashedPassword,
    });
    
    // return response.status(201).send ({message:"User created successfully"});
    return response.status(201).send({ message: "User created successfully" });
} catch (error) {
  console.error("Error in createUser:", error);
  return response.status(500).send({ message: "Internal server error" });
};

}

// const loginUser = async (request:Request, response:Response) => {
//     try {
//         const { email, password}= request.body as IUser;
//         const exsistingUser = User.findOne({ email });
//         if (!exsistingUser) {
//             return response.status(409).send({message: "User doesnt exsist"});
//         }

//         const isPasswordIdentical = await bcrypt.compare(password,(await exsistingUser).password );
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
    return response.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return response.status(500).send({ message: "Internal server error" });
  }
};


export { createUser, loginUser };


