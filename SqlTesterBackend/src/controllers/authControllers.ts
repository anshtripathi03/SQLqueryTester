import { Request, Response } from "express";
import User from "../models/userSchema";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username, name } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user._id.toString());

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      message: "User successfully registered",
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};

export const login = async(req: Request, res: Response) => {
    try {
        const { email, username, password} = req.body;

        const user = await User.findOne({
            $or: [{email}, {username}]
        })

        if(!user){
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid Password'
            })
        }

        const token = await generateToken(user._id.toString());

        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            user,
            success: true,
            message: 'Login succesfull'
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error?.message
        })
    }
}


export const getUser = async(req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        return res.status(201).json({
            user,
            message:'User fetched'
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error?.message
        })      
    }
}

export const logout = async(req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken");

        return res.status(200).json({
            message: 'User Logged out successfully'
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error?.message
        })
    }
}