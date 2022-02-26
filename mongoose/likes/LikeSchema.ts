/**
 * @file The file represents mongoose schema for the Like object.
 */
import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents the Like object.
 * @property {ObjectId} tuit Tuit that has been liked by the user.
 * @property {ObjectId} likedBy User that has liked the tuit.
 */
const LikeSchema = new mongoose.Schema<Like>(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "likes" }
);
export default LikeSchema;
