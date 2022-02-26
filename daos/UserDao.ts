/**
 * @file The file represents a class that implements Data access object for managing the User collection.
 */
import UserModel from "../mongoose/users/UserModel";
import User from "../models/users/User";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * Implements Data Access Object managing data storage
 * of Users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
  private static userDao: UserDao | null = null;
  public static getInstance = (): UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
  };
  private constructor() {}

  /**
   * Finds all the users from the database
   * @returns List of User objects
   */
  findAllUsers = async (): Promise<User[]> => UserModel.find().exec();

  /**
   * Returns user object matching the user id
   * @param uid primary key of the User collection
   * @returns User object matching the uid
   */
  findUserById = async (uid: string): Promise<any> => UserModel.findById(uid);

  /**
   * Creates a new user.
   * @param user New User object that is to be created in the database
   * @returns The created user object
   */
  createUser = async (user: User): Promise<User> => UserModel.create(user);

  /**
   * Updates the user with given uid.
   * @param uid primary key of the User collection
   * @param user updated user object
   * @returns status if the update was successful
   */
  updateUser = async (uid: string, user: User): Promise<any> =>
    UserModel.updateOne({ _id: uid }, { $set: user });

  /**
   * Deletes user with the given uid.
   * @param uid primary key of the User collection
   * @returns status if the delete was successful
   */
  deleteUser = async (uid: string): Promise<any> =>
    UserModel.deleteOne({ _id: uid });

  /**
   * Deletes all users from the database.
   * @returns status if delete was successful
   */
  deleteAllUsers = async (): Promise<any> => UserModel.deleteMany({});
}
