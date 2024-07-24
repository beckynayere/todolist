import { Request, Response } from "express";
import bcrypt from "bcrypt";
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

// }catch (error) {
//     console.log("error in Createuser, error");
//     throw error
// };

}

const loginUser = async (request:Request, response:Response) => {
    try {
        const {} = request.body

        } catch (error) {
            console.log('error in loggingUser, error ');
            throw(error)
        }
    }


export { createUser };


