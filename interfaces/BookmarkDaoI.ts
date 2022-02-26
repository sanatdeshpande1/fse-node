import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
  findAllBookmarks(uid: string): Promise<Bookmark[]>;
  userUnbookmarksTuit(tid: string, uid: string): Promise<any>;
  userBookmarksTuit(tid: string, uid: string): Promise<Bookmark>;
}
