/**
 * @file The file represents mongoose schema for Bookmarks object collection.
 */
import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents the Bookmark object.
 * @property {ObjectId} bookmarkedTuit Tuit that has been bookmarked.
 * @property {ObjectId} bookmarkedBy User that bookmarked the tuit.
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>(
  {
    bookmarkedTuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "bookmarks" }
);
export default BookmarkSchema;
