import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "src/models/user-model";

const createUser = async (request:Request, response:Response) => {
try {
    const {name, email, password} = request.body
    const exsistingUser = await User.find({email})
    if (exsistingUser) {
        return response.status(409).send ("user already exsist")
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create ({
        name,
        email,
        hashedPassword
    })
    
    return response.status(201).send ({message:})

}catch (error) {
    console.log("error in Createuser, error")
    throw error
}


