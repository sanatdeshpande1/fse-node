/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import { Express, Request, Response } from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/sentmessage to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/receivedmessage to retrieve all the messages received by a user
 *     </li>
 *     <li>POST /api/users/:uid/message/:rid to record that a user has sent a message to another user
 *     </li>
 *     <li>DELETE /api/users/:uid/message/:mid to record that a user has deleted a message
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();

      app.get(
        "/api/users/:uid/sentmessage",
        MessageController.messageController.findAllMessageSentByUser
      );

      app.get(
        "/api/users/:uid/receivedmessage",
        MessageController.messageController.findAllMessageReceivedByUser
      );

      app.post(
        "/api/users/:uid/message/:rid",
        MessageController.messageController.createMessageByUser
      );

      //   app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);

      app.delete(
        "/api/users/:uid/message/:mid",
        MessageController.messageController.deleteMessage
      );
    }
    return MessageController.messageController;
  };

  private constructor() {}

  /**
   * Retrieves all messages sent by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user that sent the messages
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the Message objects that were sent
   */
  findAllMessageSentByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .findAllMessageSentByUser(req.params.uid)
      .then((messages: Message[]) => res.json(messages));

  /**
   * Retrieves all messages received by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user that received the messages
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the Message objects that were received
   */
  findAllMessageReceivedByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .findAllMessageReceivedByUser(req.params.uid)
      .then((messages: Message[]) => res.json(messages));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and rid representing the user that is sending a message to other user along
   * with the message being part of the body of the request
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the
   * database
   */
  createMessageByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .createMessageByUser(req.params.uid, req.params.rid, req.body)
      .then((message: Message) => res.json(message));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and mid representing the user that is deleting
   * the message and the message being deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting the message was successful or not
   */
  deleteMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .deleteMessage(req.params.uid, req.params.mid)
      .then((status) => res.send(status));
}
