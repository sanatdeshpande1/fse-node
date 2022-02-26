/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits that they bookmark, as in user bookmarks a tuit
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Follow Represents follow relationship between
 * users and tuits that they bookmark, as in user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit that is bookmarked
 * @property {User} bookmarkedBy User that bookmarked the tuit
 */
export default interface Bookmark {
  bookmarkedTuit: Tuit;
  bookmarkedBy: User;
}
