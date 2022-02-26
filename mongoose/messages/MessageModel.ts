/**
 * @file Represents the mongoose model for Message created from Message schema.
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;
