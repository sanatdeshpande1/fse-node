/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikesModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";;
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    private constructor() { }
    
    /**
     * Uses DislikeModel to retrieve all users that disliked a tuit
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    
    /**
     * Uses DislikeModel to update the user that disliked a tuit
     * @returns Promise To be notified when the tuit is updated
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });
    
    /**
     * Uses DislikeModel to retrieve a user that disliked a tuit
     * @returns Promise To be notified when the user is retrieved from
     * database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({ tuit: tid, dislikedBy: uid });
    
    /**
     * Uses DislikeModel to update the user that removed his/her dislike from a tuit
     * @returns Promise To be notified when the tuit is updated
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });
    
    /**
     * Uses DislikeModel to retrieve count of dislikes for a tuid
     * @returns Promise To be notified when the count is returned
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}