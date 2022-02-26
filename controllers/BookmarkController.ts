/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import { Express, Request, Response } from "express";
// import LikeDao from "../daos/LikeDao";
import BookmarkDao from "../daos/BookmarkDao";
//  import LikeControllerI from "../interfaces/LikeControllerI";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by a user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to record that a user
 *     unbookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return BookmarkController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.get(
        "/api/users/:uid/bookmarks",
        BookmarkController.bookmarkController.findAllBookmarks
      );
      app.post(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userBookmarksTuit
      );
      app.delete(
        "/api/users/:uid/unbookmarks/:tid",
        BookmarkController.bookmarkController.userUnbookmarksTuit
      );
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}

  /**
   * Retrieves all tuits bookmarked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user bookmarked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were bookmarked
   */
  findAllBookmarks = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findAllBookmarks(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is bookmarking the tuit
   * and the tuit being bookmarked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userBookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userBookmarksTuit(req.params.uid, req.params.tid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unbookmarking
   * the tuit and the tuit being unbookmarking
   * @param {Response} res Represents response to client, including status
   * on whether deleting the bookmark was successful or not
   */
  userUnbookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userUnbookmarksTuit(req.params.uid, req.params.tid)
      .then((status) => res.send(status));
}
