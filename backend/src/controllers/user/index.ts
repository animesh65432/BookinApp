import { Request, Response } from "express";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import { createthetokens } from "../../utils";
import bcrypt from "bcryptjs";

export const createtheuser = async (req: Request, res: Response) => {
  try {
    let { Email, Password } = req.body;
    let Exsitinguser = await User.findOne({
      Email: Email,
    });

    if (Exsitinguser) {
      res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        error: "user already exsit",
      });
    }

    let haspassword = await bcrypt.hash(Password, 10);

    let newuser = new User({
      ...req.body,
      Password: haspassword,
    });
    await newuser.save();

    let idtoken = createthetokens({ _id: newuser._id });

    res.cookie("auth_token", idtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 86400000,
    });
    return res.status(StatusCodes.OK).json({
      sucess: true,
      data: "sucessfully create the user",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      error: "Sever errors",
    });
  }
};

export const logintheuser = async (req: Request, res: Response) => {
  try {
    let { Email, Password } = req.body;

    let user = await User.findOne({
      Email: Email,
    });

    if (!user) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        sucess: false,
        error: "user does not exsit",
      });
    }

    let ispasswordcoorect = bcrypt.compare(Password, user.Password);

    if (!ispasswordcoorect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        error: "password does not match",
      });
    }

    let idtoken = createthetokens({ _id: user._id });
    res.cookie("auth_token", idtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 86400000,
    });

    return res.status(StatusCodes.OK).json({
      sucess: true,
      data: {
        userid: user._id,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      error: error,
    });
  }
};
