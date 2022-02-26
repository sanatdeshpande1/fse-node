/**
 * @file Declares Message data type representing relationship between
 * users and messages that they send to other users
 */
import User from "../users/User";

/**
 * @typedef Message Represents messages sent by one user to another user
 * @property {string} message Message that is sent
 * @property {User} from User that sent the message
 * @property {User} to User that received the message
 * @property {Date} sentOn Date on which the message was sent
 */
export default interface Message {
  message: string;
  to: User;
  from: User;
  sentOn?: Date;
}
