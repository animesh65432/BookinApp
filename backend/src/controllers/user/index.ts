import { Request, Response } from "express";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import { createthetokens } from "../../utils";
import bcrypt from "bcryptjs";

export const createtheuser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let { Email, Password, UserName } = req.body;
    let Exsitinguser = await User.findOne({
      Email: Email,
    });

    if (Exsitinguser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: "User already exists",
      });
    }

    let haspassword = await bcrypt.hash(Password, 10);

    let newuser = new User({
      UserName: UserName,
      Password: haspassword,
      Email: Email,
    });
    await newuser.save();

    let idtoken = createthetokens({ _id: newuser._id });

    res.cookie("auth_token", idtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 86400000,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: "Successfully created the user",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server error",
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
        success: false,
        error: "User does not exist",
      });
    }

    let isPasswordCorrect = await bcrypt.compare(Password, user.Password);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: "Password does not match",
      });
    }

    let idtoken = createthetokens({ _id: user._id });
    res.cookie("auth_token", idtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 86400000,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        userid: user._id,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Internal server error",
    });
  }
};
