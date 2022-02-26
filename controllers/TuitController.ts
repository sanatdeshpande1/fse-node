/**
 * @file Controller RESTful Web service API for tuits resource
 */
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/tuits/Tuit";
import { Express, Request, Response } from "express";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits to retrieve all the tuits
 *     </li>
 *     <li>GET /api/users/:uid/tuits to retrieve all the tuits posted by a user
 *     </li>
 *     <li>GET /api/tuits/:uid to retrieve a tuit by its id
 *     </li>
 *     <li>POST /api/users/:uid/tuits to record that a user has posted a tuit
 *     </li>
 *     <li>DELETE /api/tuits/:uid to record that a user has deleted a tuit
 *     </li>
 *     <li>PUT /api/tuits/:uid to record that a user has updated a tuit
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing likes CRUD operations
 * @property {TuitController} TuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
  private static tuitDao: TuitDao = TuitDao.getInstance();
  private static tuitController: TuitController | null = null;
  public static getInstance = (app: Express): TuitController => {
    if (TuitController.tuitController === null) {
      TuitController.tuitController = new TuitController();
      app.get("/api/tuits", TuitController.tuitController.findAllTuits);

      app.get(
        "/api/users/:uid/tuits",
        TuitController.tuitController.findAllTuitsByUser
      );

      app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);

      app.post(
        "/api/users/:uid/tuits",
        TuitController.tuitController.createTuitByUser
      );

      app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);

      app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
    }
    return TuitController.tuitController;
  };

  private constructor() {}

  /**
   * Retrieves all tuits from the database
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the Tuit objects
   */
  findAllTuits = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findAllTuits()
      .then((tuits: Tuit[]) => res.json(tuits));

  /**
   * Retrieves all tuits sent by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user that posted the tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the Tuit objects
   */
  findAllTuitsByUser = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findAllTuitsByUser(req.params.uid)
      .then((tuits: Tuit[]) => res.json(tuits));

  /**
   * Retrieves a tuit by its id from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the id of the tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the Tuit object
   */
  findTuitById = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitById(req.params.uid)
      .then((tuit: Tuit) => res.json(tuit));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid representing the user that is posting the tuit along
   * with the tuit being part of the body of the request
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted in the
   * database
   */
  createTuitByUser = (req: Request, res: Response) =>
    TuitController.tuitDao
      .createTuitByUser(req.params.uid, req.body)
      .then((tuit: Tuit) => res.json(tuit));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameter uid and the tuit being updated as part of the request body
   * @param {Response} res Represents response to client, including status
   * on whether updating the tuit was successful or not
   */
  updateTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .updateTuit(req.params.uid, req.body)
      .then((status) => res.send(status));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameter uid representing the tuit that is deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting the tuit was successful or not
   */
  deleteTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .deleteTuit(req.params.uid)
      .then((status) => res.send(status));
}
