/**
 * @file Represents mongoose schema for Follow object.
 */
import mongoose, { Schema } from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents the Follow object.
 * @property {ObjectId} userFollowed User that has been followed by another user.
 * @property {ObjectId} userFollowing User that is following another user.
 */
const FollowSchema = new mongoose.Schema<Follow>(
  {
    userFollowed: { type: Schema.Types.ObjectId, ref: "UserModel" },
    userFollowing: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "follows" }
);
export default FollowSchema;
