/**
 * @file The file represents a class that implements the data access object for managing Like collection.
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * Implements Data Access Object managing data storage
 * of Likes
 * @implements {LikeDaoI} LikeDaoI
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };
  private constructor() {}

  /**
   * Returns the list of user ids that like a tuit.
   * @param tid id of the Tuit that is liked
   * @returns List of Like objects containing the users that liked the tuit.
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate("likedBy").exec();

  /**
   * Returns a list of tuits liked by given user.
   * @param uid id of the User
   * @returns List of Like objects containing all tuits like by user.
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate("tuit").exec();

  /**
   * Returns Like object containing ids of the user and the tuit that they liked.
   * @param uid id of the user that likes a tuit
   * @param tid id of the tuit that is liked by a user
   * @returns Newly created Like object
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Deletes the specified liked tuit of the user from the database.
   * @param uid id of the user that unlikes a tuit
   * @param tid id of the tuit that is unliked by a user
   * @returns status if the tuit is successfully deleted.
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
