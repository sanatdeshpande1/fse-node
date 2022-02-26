/**
 * @file Declares User data type representing the users created in the database.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
export default interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profilePhoto?: string;
  headerImage?: string;
  biography?: string;
  dateOfBirth?: Date;
  accountType?: AccountType;
  maritalStatus?: MaritalStatus;
  location?: Location;
}
