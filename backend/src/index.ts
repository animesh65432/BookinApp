import express from "express";
import cors from "cors";
import "dotenv/config";
import momgoose from "mongoose";
import user from "./routers/user";
momgoose.connect(process.env.mongodb_connection_string as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", user);
app.listen(3000, () => console.log(`sever start at the ${3000}`));
