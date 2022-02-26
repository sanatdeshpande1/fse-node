/**
 * @file The file represents mongoose schema of the User object.
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * Creates a schema for User object.
 * @typedef User Represents the user object
 * @property {string} username The username of the user
 * @property {string} password The password of the user
 * @property {string} firstname The first name of the user
 * @property {string} lastname The last name of the user
 * @property {string} email The email of the user
 * @property {string} profilePhoto The profile photo of the user
 * @property {string} headerImage The header image of the user
 * @property {string} biography The biography of the user
 * @property {Date} dateOfBirth The date of birth of the user
 * @property {string} accountType The type of account that user has
 * @property {string} maritalStatus The marital status of the user
 * @property {Location} location The location of the user consisting of latitude and longitude
 */
const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      default: `testusername${Date.now()}`,
    },
    password: {
      type: String,
      required: true,
      default: `testpassword${Date.now()}`,
    },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, default: `testemail${Date.now()}` },
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {
      type: String,
      enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
    },
    maritalStatus: { type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"] },
    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  { collection: "users" }
);

export default UserSchema;
