/**
 * @file The file represents mongoose schema for Message object.
 */
import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents the Message object.
 * @property {string} message The message that user has sent
 * @property {ObjectId} to User to which the message has been sent
 * @property {ObjectId} from User who sent the message.
 * @property {ObjectId} sentOn Date on which the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>(
  {
    message: { type: String, required: true },
    to: { type: Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);
export default MessageSchema;
