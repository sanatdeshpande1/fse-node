import Message from "../models/messages/Message";
/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
  findAllMessageSentByUser(uid: string): Promise<Message[]>;
  findAllMessageReceivedByUser(uid: string): Promise<Message[]>;
  createMessageByUser(
    uid: string,
    rid: string,
    message: Message
  ): Promise<Message>;
  //   updateTuit(tid: string, tuit: Tuit): Promise<any>;
  deleteMessage(uid: string, mid: string): Promise<any>;
}
