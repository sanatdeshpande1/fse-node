import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
  findAllFollowing(uid: string): Promise<Follow[]>;
  findAllFollowers(uid: string): Promise<Follow[]>;
  userFollowsUser(uid: string, fid: string): Promise<Follow>;
  userUnfollowsUser(uid: string, fid: string): Promise<any>;
}
