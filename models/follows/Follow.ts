/**
 * @file Declares Follow data type representing relationship between
 * users and followers, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follow relationship between two users,
 * as in a user follows another user
 * @property {User} userFollowed User that is followed
 * @property {User} userFollowing User that is following
 */
export default interface Follow {
  userFollowed: User;
  userFollowing: User;
}
