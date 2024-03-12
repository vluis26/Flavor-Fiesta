import { Response, Request } from "express";
import { User } from "../models";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcryptjs'
import { CONSTANTS } from "../constants";

// generate a JWT token based on user ID
const signToken = (id: string) =>{
    return jwt.sign({id}, process.env.JWT_SECRET as string,{expiresIn: process.env.JWT_EXPIRESIN as string})
}

// Controller for user registration or login
export const registerOrLogin = async (req: Request, res: Response)=> {
    // Destructuring email and password from the request body
    const{ email, password }: { email: string; password:string } = req.body;

    try{
        // of user exists
        const _user= await User.findOne({email}).select('+password').exec();

        // If the user exists, compare the provided password with the stored password
        if(_user){
            if(!(await(bycrypt.compare(password, _user.password)))){
                return res.status(400).json({ error: "Invalid email or passowrd" })
            }

            // If passwords match, generate a JWT token and return it along with user details
            const token = signToken(_user?._id)
            return res.status(200).json({token, email, id: _user?._id})
        }

        // If the user does not exist, create a new user with the provided email and hashed password
        const newUser = await User.create({email, password: await bycrypt.hash(password, CONSTANTS.SALT)})

        // Generate a JWT token for the new user and return it along with user details
        const token =signToken(newUser._id)

        return res.status(201).json({token, email: newUser?.email, id: newUser._id})
    } catch (error){
        console.log(error)
        return res.status(500).json({error: "Error occured while processing request."})
    }

};