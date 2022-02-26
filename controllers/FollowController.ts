/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
//  import LikeDao from "../daos/LikeDao";
import FollowDao from "../daos/FollowDao";
//  import LikeControllerI from "../interfaces/LikeControllerI";
import FollowControllerI from "../interfaces/FollowControllerI";
/**
 * @class FollowController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followers to retrieve all followers
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users following a user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:fid to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:fid to record that a user
 *     unfollows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.get(
        "/api/users/:uid/following",
        FollowController.followController.findAllFollowers
      );
      app.get(
        "/api/users/:uid/followers",
        FollowController.followController.findAllFollowing
      );
      app.post(
        "/api/users/:uid/follows/:fid",
        FollowController.followController.userFollowsUser
      );
      app.delete(
        "/api/users/:uid/unfollows/:fid",
        FollowController.followController.userUnfollowsUser
      );
    }
    return FollowController.followController;
  };

  private constructor() {}

  /**
   * Retrieves all users that follow a user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user that is being followed.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllFollowers = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllFollowers(req.params.uid)
      .then((users) => res.json(users));

  /**
   * Retrieves all users following a user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user which is following other users.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllFollowing = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllFollowing(req.params.uid)
      .then((users) => res.json(users));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and fid representing the user that is following
   * and the user that is being followed
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userFollowsUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userFollowsUser(req.params.uid, req.params.fid)
      .then((users) => res.json(users));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and fid representing the user that is following
   * and the user that is being followed
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnfollowsUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userUnfollowsUser(req.params.uid, req.params.fid)
      .then((status) => res.send(status));
}
