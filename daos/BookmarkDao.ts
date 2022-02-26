/**
 * @file The file represents a class that implements data access object for managing Bookmark collection.
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  };
  private constructor() {}

  /**
   * Returns all bookmarked tuits of the given user.
   * @param uid id of the user
   * @returns Bookmarks of the user.
   */
  findAllBookmarks = async (uid: string): Promise<Bookmark[]> =>
    BookmarkModel.find({ bookmarkedBy: uid }).populate("bookmarkedTuit");

  /**
   * Creates a new bookmark.
   * @param uid id of the user
   * @param tid id of the tuit that is being bookmarked
   * @returns newly created bookmark
   */
  userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
    BookmarkModel.create({ bookmarkedTuit: tid, bookmarkedBy: uid });

  /**
   * Deletes a bookmark from the database.
   * @param uid id of the user
   * @param tid id of the tuit that is being unbookmarked
   * @returns status if delete is successful
   */
  userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
    BookmarkModel.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
}
