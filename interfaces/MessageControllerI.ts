import { Request, Response } from "express";
// import Tuit from "../models/tuits/Tuit";
import Message from "../models/messages/Message";

export default interface MessageControllerI {
  //   findAllTuits(req: Request, res: Response): void;
  findAllMessageSentByUser(req: Request, res: Response): void;
  findAllMessageReceivedByUser(req: Request, res: Response): void;

  // findTuitById(req: Request, res: Response): void;
  createMessageByUser(req: Request, res: Response): void;
  //   updateTuit(req: Request, res: Response): void;
  deleteMessage(req: Request, res: Response): void;
}
