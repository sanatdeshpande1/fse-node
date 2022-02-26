/**
 * @file Controller RESTful Web service API for users resource
 */
import UserDao from "../daos/UserDao";
import User from "../models/users/User";
import { Express, Request, Response } from "express";
import UserControllerI from "../interfaces/UserControllerI";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users to retrieve all the users
 *     </li>
 *     <li>GET /api/users/:uid to retrieve user with the given id
 *     </li>
 *     <li>POST /api/users to record that a user is created
 *     </li>
 *     <li>DELETE /api/users/:uid to record that a user is deleted
 *     </li>
 *     <li>DELETE /api/users to record all users are deleted
 *     </li>
 *     <li>PUT /api/users/:uid to record that a user is updated
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing likes CRUD operations
 * @property {UserController} UserController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
  private static userDao: UserDao = UserDao.getInstance();
  private static userController: UserController | null = null;
  public static getInstance = (app: Express): UserController => {
    if (UserController.userController === null) {
      UserController.userController = new UserController();

      // for testing without postman. Not RESTful
      app.get("/api/users/create", UserController.userController.createUser);
      app.get(
        "/api/users/:uid/delete",
        UserController.userController.deleteUser
      );
      app.get(
        "/api/users/delete",
        UserController.userController.deleteAllUsers
      );

      // RESTful User Web service API
      app.get("/api/users", UserController.userController.findAllUsers);
      app.get("/api/users/:uid", UserController.userController.findUserById);
      app.post("/api/users", UserController.userController.createUser);
      app.put("/api/users/:uid", UserController.userController.updateUser);
      app.delete("/api/users/:uid", UserController.userController.deleteUser);
      app.delete("/api/users", UserController.userController.deleteAllUsers);
    }
    return UserController.userController;
  };

  private constructor() {}

  /**
   * Retrieves all users from the database
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the User objects
   */
  findAllUsers = (req: Request, res: Response) =>
    UserController.userDao
      .findAllUsers()
      .then((users: User[]) => res.json(users));

  /**
   * Retrieves a user by its id from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the id of the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the User object
   */
  findUserById = (req: Request, res: Response) =>
    UserController.userDao
      .findUserById(req.params.uid)
      .then((user: User) => res.json(user));

  /**
   * @param {Request} req Represents request from client, including the user
   * being part of the body of the request
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new user that was inserted in the
   * database
   */
  createUser = (req: Request, res: Response) =>
    UserController.userDao
      .createUser(req.body)
      .then((user: User) => res.json(user));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameter uid and the user being updated as part of the request body
   * @param {Response} res Represents response to client, including status
   * on whether updating the user was successful or not
   */
  updateUser = (req: Request, res: Response) =>
    UserController.userDao
      .updateUser(req.params.uid, req.body)
      .then((status) => res.send(status));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameter uid representing the user that is deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting the user was successful or not
   */
  deleteUser = (req: Request, res: Response) =>
    UserController.userDao
      .deleteUser(req.params.uid)
      .then((status) => res.send(status));

  /**
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including status
   * on whether deleting all the users was successful or not
   */
  deleteAllUsers = (req: Request, res: Response) =>
    UserController.userDao.deleteAllUsers().then((status) => res.send(status));
}
