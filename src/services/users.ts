import bcrypt from 'bcrypt';
import UserModel from '../models/users';
import { Roles } from '../enums/roles';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IUser, { ICreateUser, IUpdateUser } from '../interfaces/user';
import CartServices from './cart';
import AuthorizationService from './authorize';

const logger = loggerWithNameSpace('Users Service');
const salt = 10;
export default class UserService {
  static async getAllUsers() {
    const data = await UserModel.getAllUsers();
    if (!data) {
      return null;
    }
    logger.info('All Users Found');
    const users = data.map(({ passwordHash, ...user }) => user);
    return users;
  }
  static async getUser(userId: string) {
    const data = await UserModel.getUser(userId);
    if (!data) {
      logger.error(`User with id ${userId} not found`);
      return null;
    }
    logger.info(`User with id ${userId} found`);
    const { passwordHash, ...user } = data;
    return user;
  }

  static async getUserByEmail(email: string) {
    const data = await UserModel.getUserByEmail(email);
    if (!data) {
      logger.error(`User with email ${email} not found`);
      return null;
    }
    logger.info(`User with email ${email} found`);
    return data;
  }

  static async createUser(user: ICreateUser) {
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const queryResult = await UserModel.createUser(user)!;
    if (!queryResult) {
      logger.error('Could not create new user');
      throw new ModelError('Could not create User');
    }

    await this.assignRole(queryResult.id, Roles.CUSTOMER);
    await CartServices.createCart(queryResult.id);
    return queryResult as IUser;
  }

  static async editUser(id: string, updateUserData: IUpdateUser) {
    if (updateUserData.password) {
      const hashedPassword = await bcrypt.hash(updateUserData.password, salt);
      updateUserData.passwordHash = hashedPassword;
      delete updateUserData.password;
    }
    const queryResult = await UserModel.editUserById(id, updateUserData)!;
    if (!queryResult) {
      logger.error(`Editing user with id ${id} failed`);
      logger.error(`Could not edit user with id ${id}`);
      throw new ModelError('Could not edit User');
    }

    return queryResult as IUser;
  }
  static async getRoleId(userId: string) {
    const role = await AuthorizationService.getRoleId(userId);
    if (!role) {
      logger.error(`Role of user with id ${userId} not found`);
      return null;
    }
    logger.info(`Role of user with id ${userId} found`);
    return role;
  }

  static async deleteUser(id: string) {
    const queryResult = await UserModel.deleteUserById(id)!;
    if (!queryResult) {
      logger.error(`Deleting user with id ${id} failed`);
      logger.error(`Could not delete user with id ${id}`);
      throw new ModelError('Could not delete User');
    }
    return true;
  }

  static async assignRole(userId: string, role: string) {
    const queryResult = await UserModel.assignRole(userId, role)!;
    if (!queryResult) {
      logger.error('Cannot insert the data in the database');
      logger.error(`Could not assign role to the user with id ${userId}`);
      throw new ModelError('Could not assign Role');
    }
    return queryResult;
  }
  static async updateRole(userId: string, role: string) {
    const queryResult = await UserModel.updateRole(userId, role)!;
    if (!queryResult) {
      logger.error('Cannot update the data in the database');
      logger.error(`Could not update role to the userId ${userId}`);
      throw new ModelError('Could not update Role');
    }
    logger.info(`Updated role of the userId ${userId}`);
    return queryResult;
  }
}
