/**
 * @file Declares Tuit data type representing relationship between
 * users and tuits that they post.
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents the Tuit object
 * @property {string} tuit Tuit that the user has posted
 * @property {User} postedBy User that posted the tuit
 * @property {Date} postedOn Date on which the tuit was posted
 */
export default interface Tuit {
  tuit: string;
  postedBy: User;
  postedOn?: Date;
}
