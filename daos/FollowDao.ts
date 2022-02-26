/**
 * @file The file represents a class that implements data access object for managing Follow collection.
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;
  public static getInstance = (): FollowDao => {
    if (FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  };
  private constructor() {}

  /**
   * Returns all users that the user follows.
   * @param uid id of the user
   * @returns Users that the given user follows
   */
  findAllFollowing = async (uid: string): Promise<Follow[]> =>
    FollowModel.find({ userFollowed: uid }).populate("userFollowing").exec();

  /**
   * Returns all the followers of the specified user.
   * @param uid id of the user
   * @returns Followers of the user.
   */
  findAllFollowers = async (uid: string): Promise<Follow[]> =>
    FollowModel.find({ userFollowing: uid }).populate("userFollowed").exec();

  /**
   * Returns a new follow object mapping between two users.
   * @param uid User that follows another user
   * @param fid User that is being followed by another user.
   * @returns newly created Follow object
   */
  userFollowsUser = async (uid: string, fid: string): Promise<any> =>
    FollowModel.create({ userFollowed: fid, userFollowing: uid });

  /**
   * Deletes the follow mapping of the users from the database.
   * @param uid User that unfollows another user
   * @param fid User that is being unfollowed by another user.
   * @returns status if the unfollow is successful
   */
  userUnfollowsUser = async (uid: string, fid: string): Promise<any> =>
    FollowModel.deleteOne({ userFollowed: fid, userFollowing: uid });
}
