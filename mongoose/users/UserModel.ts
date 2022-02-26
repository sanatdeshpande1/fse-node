/**
 * @file The file represents mongoose model created for User from the User schema.
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";
const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
