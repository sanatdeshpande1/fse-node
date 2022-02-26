/**
 * @file The file represents a class that implements Data access object for maintaining the Message collection.
 */
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * Implements Data Access Object managing data storage
 * of Messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };
  private constructor() {}

  /**
   * Returns all messages sent by the given user.
   * @param uid primary key of the User collection
   * @returns List of messages sent by the user
   */
  findAllMessageSentByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ from: uid });

  /**
   * Returns all the messages received by the given user.
   * @param uid primary key of the User collection
   * @returns List of messages received by the user
   */
  findAllMessageReceivedByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ to: uid });

  /**
   * Creates a new message sent by a user to another user.
   * @param uid User sending the message
   * @param rid User receiving the message
   * @param message Message that is being sent.
   * @returns The newly created message object.
   */
  createMessageByUser = async (
    uid: string,
    rid: string,
    message: Message
  ): Promise<Message> =>
    MessageModel.create({ ...message, from: uid, to: rid });

  /**
   * Deletes a specified message from database.
   * @param uid primary key of User collection
   * @param mid primary key of the Message collection
   * @returns status if the specified message was deleted
   */
  deleteMessage = async (uid: string, mid: string): Promise<any> =>
    MessageModel.deleteOne({ _id: mid, from: uid });
}
