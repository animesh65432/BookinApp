import mongoose from "mongoose";
import { UserTypes } from "../types";
const userschema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserTypes>("User", userschema);
export default User;
