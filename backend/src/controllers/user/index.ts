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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      error: "Sever errors",
    });
  }
};
