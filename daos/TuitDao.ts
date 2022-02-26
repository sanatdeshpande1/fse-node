/**
 * @file The file represents a class that implements Data access object for managing Tuit collection.
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  /**
   * Returns all the tuits from the database.
   * @returns List of all Tuits
   */
  findAllTuits = async (): Promise<Tuit[]> => TuitModel.find();

  /**
   * Returns the tuits of the specified user.
   * @param uid primary key of the User collection
   * @returns Tuits of the given user.
   */
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid });

  /**
   * Returns the tuit with the given id.
   * @param uid primary key of the Tuit collection
   * @returns Tuit of the specified uid
   */
  findTuitById = async (uid: string): Promise<any> =>
    TuitModel.findById(uid).populate("postedBy").exec();

  /**
   * Creates a new Tuit.
   * @param uid primary key of the User collection
   * @param tuit new Tuit object created by the user
   * @returns newly created Tuit
   */
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });

  /**
   * Updates the specified tuit with the updated tuit.
   * @param uid primary key of User collection
   * @param tuit updated tuit
   * @returns status if update was successful
   */
  updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: uid }, { $set: tuit });

  /**
   * Deletes the tuit with the specified uid.
   * @param uid primary key of the Tuit collection
   * @returns status if delete was successful
   */
  deleteTuit = async (uid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: uid });
}
