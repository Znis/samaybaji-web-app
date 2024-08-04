import IUser, { ICreateUser, IUpdateUser } from '../interfaces/user';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('User Model');
export default class UserModel extends BaseModel {
  /**
   * Retrieves all users from the 'users' table.
   *
   * @return {Promise<Array<Object> | null>} A promise that resolves to an array of user objects, or null if an error occurs.
   */
  static getAllUsers() {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a user from the 'users' table based on the provided userId.
   *
   * @param {string} userId - The unique identifier of the user to retrieve.
   * @return {Promise<Object | null>} A promise that resolves to the user object if found, or null if not found or an error occurs.
   */
  static getUser(userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .where('id', userId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a user from the 'users' table based on the provided email.
   *
   * @param {string} email - The email of the user to retrieve.
   * @return {Promise<Object | null>} A promise that resolves to the user object if found, or null if not found or an error occurs.
   */
  static getUserByEmail(email: string) {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .where('email', email)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates a new user in the 'users' table with the provided user details.
   *
   * @param {ICreateUser} user - The user details to be inserted into the 'users' table.
   * @return {Promise<Object | null>} A promise that resolves to the newly created user object if successful, or null if an error occurs.
   */
  static createUser(user: ICreateUser) {
    return this.queryBuilder()
      .insert({
        name: user.name,
        email: user.email,
        passwordHash: user.password,
        phoneNumber: user.phoneNumber,
        imageSrc: user.imageSrc,
      })
      .into('users')
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Assigns a role to a user in the 'users_roles' table.
   *
   * @param {string} userId - The ID of the user to assign the role to.
   * @param {string} role - The role to assign to the user.
   * @return {Promise<Object | null>} A promise that resolves to the inserted data if successful, or null if an error occurs.
   */
  static assignRole(userId: string, role: string) {
    return this.queryBuilder()
      .insert({
        userId: userId,
        roleId: role,
      })
      .into('users_roles')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Updates the role of a user in the database.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {string} role - The new role to assign to the user.
   * @return {Promise<any>} A promise that resolves to the updated data or null if an error occurs.
   */
  static updateRole(userId: string, role: string) {
    return this.queryBuilder()
      .update({
        roleId: role,
      })
      .into('users_roles')
      .where('user_id', userId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Updates a user in the database by their ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {IUpdateUser} updateUserData - The data to update the user with.
   * @return {Promise<IUser | null>} A promise that resolves to the updated user data or null if an error occurs.
   */
  static editUserById(id: string, updateUserData: IUpdateUser) {
    return this.queryBuilder()
      .update(updateUserData)
      .from('users')
      .where('id', id)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Deletes a user from the database by their ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @return {Promise<any>} A Promise that resolves with the deleted user data or null if an error occurs.
   */
  static deleteUserById(id: string) {
    return this.queryBuilder()
      .del()
      .from('users')
      .where('id', id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
