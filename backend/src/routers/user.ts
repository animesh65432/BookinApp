import { Router } from "express";
import { Checkcreatetheuserbody } from "../utils";
import { createtheuser } from "../controllers/user";

const userrouter = Router();
userrouter.post("/createuser", Checkcreatetheuserbody, createtheuser);

export default userrouter;
