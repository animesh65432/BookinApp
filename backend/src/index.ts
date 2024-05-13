import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import momgoose from "mongoose";

momgoose.connect(process.env.mongodb_connection_string as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    messsage: "Hello from express",
  });
});
momgoose
  .connect(process.env.mongodb_connection_string as string)
  .then(() => {
    app.listen(() =>
      console.log(`sucessfully connected with database and server`)
    );
  })
  .catch(() => {
    console.log(`something went wrong`);
  });
