import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const connectionString = `mongodb+srv://sanatd:cs5500password@cs5500.z1jwb.mongodb.net/cs5500?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hello", (req: Request, res: Response) => res.send("Hello World!"));

app.get("/add/:a/:b", (req: Request, res: Response) =>
  res.send(req.params.a + req.params.b)
);

app.get("/hello2", (req: Request, res: Response) => res.send("Hello World2!"));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
