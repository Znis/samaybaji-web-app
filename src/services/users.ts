import bcrypt from 'bcrypt';
import UserModel from '../models/users';
import { Roles } from '../enums/roles';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IUser, { ICreateUser, IUpdateUser } from '../interfaces/user';
import CartServices from './cart';
import AuthorizationService from './authorize';
import MinioService from './minio';

const logger = loggerWithNameSpace('Users Service');
const salt = 10;
export default class UserService {
  /**
   * Retrieves all users from the database and returns them.
   *
   * @return {Promise<IUser[] | null>} An array of user objects, or null if no users are found.
   */
  static async getAllUsers() {
    const data = await UserModel.getAllUsers();
    if (!data) {
      return null;
    }
    logger.info('All Users Found');
    const users = data.map(({ passwordHash, ...user }) => user);
    const newData = await Promise.all(
      users.map(async (user: IUser) => {
        try {
          user.imageSrc = await MinioService.getReadUrl(user.imageSrc!);
        } catch {
          logger.error(`Image not found of user`);
        }
        return user;
      }),
    );
    return newData;
  }
  /**
   * Retrieves a user from the database by their ID.
   *
   * @param {string} userId - The ID of the user to retrieve.
   * @return {Promise<IUser | null>} A Promise that resolves to the user object if found, or null if not found.
   */
  static async getUser(userId: string) {
    const data = await UserModel.getUser(userId);
    if (!data) {
      logger.error(`User with id ${userId} not found`);
      return null;
    }
    logger.info(`User with id ${userId} found`);
    const { passwordHash, ...user } = data;
    try {
      user.imageSrc = await MinioService.getReadUrl(user.imageSrc!);
    } catch {
      logger.error(`Image not found for user with id ${userId}`);
    }

    return user;
  }

  /**
   * Retrieves a user from the database by their email.
   *
   * @param {string} email - The email of the user to retrieve.
   * @return {Promise<IUser | null>} A Promise that resolves to the user object if found, or null if not found.
   */
  static async getUserByEmail(email: string) {
    const data = await UserModel.getUserByEmail(email);
    if (!data) {
      logger.error(`User with email ${email} not found`);
      return null;
    }
    try {
      data.imageSrc = await MinioService.getReadUrl(data.imageSrc!);
    } catch {
      logger.error(`Image not found for user with email ${email}`);
    }
    logger.info(`User with email ${email} found`);
    return data;
  }

  /**
   * Creates a new user in the system.
   *
   * @param {ICreateUser} user - The user object containing user details.
   * @return {IUser} The newly created user object.
   */
  static async createUser(user: ICreateUser) {
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const queryResult = await UserModel.createUser(user)!;
    if (!queryResult) {
      logger.error('Could not create new user');
      throw new ModelError('Could not create User');
    }
    //assign role to the newly created user
    await this.assignRole(queryResult.id, Roles.CUSTOMER);
    await CartServices.createCart(queryResult.id);
    return queryResult as IUser;
  }

  /**
   * Edits a user in the database by their ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {IUpdateUser} updateUserData - The data to update the user with.
   * @return {Promise<IUser>} A promise that resolves to the updated user data.
   * @throws {ModelError} If the user could not be edited.
   */
  static async editUser(id: string, updateUserData: IUpdateUser) {
    if (updateUserData.password) {
      const hashedPassword = await bcrypt.hash(updateUserData.password, salt);
      updateUserData.passwordHash = hashedPassword;
      delete updateUserData.password;
    }
    const queryResult = await UserModel.editUserById(id, updateUserData)!;
    if (!queryResult) {
      logger.error(`Could not edit user with id ${id}`);
      throw new ModelError('Could not edit User');
    }

    return queryResult as IUser;
  }
  /**
   * Retrieves the role ID associated with the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {string | null} The role ID, or null if the role is not found.
   */
  static async getRoleId(userId: string) {
    const role = await AuthorizationService.getRoleId(userId);
    if (!role) {
      logger.error(`Role of user with id ${userId} not found`);
      return null;
    }
    logger.info(`Role of user with id ${userId} found`);
    return role;
  }

  /**
   * Deletes a user from the database by their ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @return {Promise<boolean>} A promise that resolves to true if the user was successfully deleted, or throws a ModelError if the deletion failed.
   */
  static async deleteUser(id: string) {
    const queryResult = await UserModel.deleteUserById(id)!;
    if (!queryResult) {
      logger.error(`Could not delete user with id ${id}`);
      throw new ModelError('Could not delete User');
    }
    return true;
  }

  /**
   * Assigns a role to a user in the database.
   *
   * @param {string} userId - The ID of the user to assign the role to.
   * @param {string} role - The role to assign to the user.
   * @return {Promise<any>} A promise that resolves to the inserted data if successful, or throws a ModelError if the assignment failed.
   */
  static async assignRole(userId: string, role: string) {
    const queryResult = await UserModel.assignRole(userId, role)!;
    if (!queryResult) {
      logger.error(`Could not assign role to the user with id ${userId}`);
      throw new ModelError('Could not assign Role');
    }
    return queryResult;
  }
  /**
   * Updates the role of a user in the database.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {string} role - The new role to assign to the user.
   * @return {Promise<any>} A promise that resolves to the updated data if successful, or throws a ModelError if the update failed.
   */
  static async updateRole(userId: string, role: string) {
    const queryResult = await UserModel.updateRole(userId, role)!;
    if (!queryResult) {
      logger.error(`Could not update role to the userId ${userId}`);
      throw new ModelError('Could not update Role');
    }
    logger.info(`Updated role of the userId ${userId}`);
    return queryResult;
  }
}
