import { EmailLoginSchema, userSchema } from "../schema/user.js"
import {compareSync, hashSync} from "bcryptjs";
import { prismaClient } from "../routes/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

//Register Controller
export const RegisterController = async(req, res) => {
    const userData = userSchema.parse(req.body)
    
    if(!userData.name || !userData.email || !userData.password || !userData.phoneNo){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    
    const hashPassword = await hashSync(userData.password, 10);

    const user = await prismaClient.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            phoneNo: userData.phoneNo
        }
    })

    return res.status(201).json({ message: "User created successfully",user });
}

//Login Controller
export const LoginController = async(req, res) => {
    const userData = EmailLoginSchema.parse(req.body)
    
    if(!userData.email || !userData.password){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    
    const user = await prismaClient.user.findUnique({
        where: {
            email: userData.email
        }
    })
  
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await compareSync(userData.password, user.password);

    if(!isPasswordMatch){
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    console.log(token)

    return res.status(200).json({ message: "Login successfully",user,token });
}

//Get User 

export const GetUserController = async(req, res) => {
    const id = req.user.id;

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    })

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({message:"User Retreived Sucessfully", user });
}