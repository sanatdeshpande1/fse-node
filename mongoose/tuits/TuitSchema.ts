/**
 * @file The file represents mongoose schema of the Tuit object.
 */
import mongoose, { Schema } from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents the Tuit object
 * @property {string} tuit Tuit that the user has posted
 * @property {ObjectId} postedBy User that posted the tuit
 * @property {Date} postedOn Date on which the tuit was posted
 */
const TuitSchema = new mongoose.Schema<Tuit>(
  {
    tuit: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now },
  },
  { collection: "tuits" }
);
export default TuitSchema;
