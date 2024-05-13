import { Router } from "express";
import { Checkcreatetheuserbody, CheckForlogintheuser } from "../utils";
import { createtheuser, logintheuser } from "../controllers/user";

const userrouter = Router();
userrouter.post("/createuser", Checkcreatetheuserbody, createtheuser);
userrouter.post("/login", CheckForlogintheuser, logintheuser);

export default userrouter;
