import bcrypt from 'bcrypt';
import UserModel from '../models/users';
import Roles from '../enums/roles';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IUser from '../interfaces/user';

const logger = loggerWithNameSpace('Users Service');
const salt = 10;
export default class UserServices {
  static async getUserByEmail(email: string) {
    const data = await UserModel.getUserByEmail(email);
    if (!data) {
      logger.error(`User with email ${email} not found`);
      return null;
    }
    logger.info(`User with email ${email} found`);
    return data;
  }

  static async createUser(user: IUser) {
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const queryResult: number[] = await UserModel.createUser(user)!;
    if (!queryResult) {
      logger.error('Could not create new user');
      throw new ModelError('Could not create User');
    }
    const newUser = await this.getUserByEmail(user.email);

    await this.assignRole(newUser!.id!, Roles.CUSTOMER);
    return user;
  }

  static async editUser(id: string, user: IUser) {
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const queryResult: number = await UserModel.editUserById(id, user)!;
    if (!queryResult) {
      logger.error(`Editing user with id ${id} failed`);
      logger.error(`Could not edit user with id ${id}`);
      throw new ModelError('Could not edit User');
    }

    return user;
  }

  static async deleteUser(id: string) {
    const queryResult: number = await UserModel.deleteUserById(id)!;
    if (!queryResult) {
      logger.error(`Deleting user with id ${id} failed`);
      logger.error(`Could not delete user with id ${id}`);
      throw new ModelError('Could not delete User');
    }
    return true;
  }

  static async assignRole(userId: string, role: string) {
    const queryResult: number[] = await UserModel.assignRole(userId, role)!;
    if (!queryResult) {
      logger.error('Cannot insert the data in the database');
      logger.error(`Could not assign role to the user with id ${userId}`);
      throw new ModelError('Could not assign Role');
    }
    return queryResult;
  }

  static async getRoleId(userId: string) {
    const data = await UserModel.getRoleId(userId);
    if (!data) {
      logger.error(`roleId of userId ${userId} not found`);
      return null;
    }
    logger.info(`roleId of userId ${userId} found`);
    return data.roleId;
  }

  static async getAssignedPermissionsForRole(roleId: string) {
    const data = await UserModel.getAssignedPermissionsForRole(roleId);
    if (!data) {
      logger.error(`Assigned permissions for roleId ${roleId} not found`);
      return null;
    }
    logger.info(`Assigned permissions for roleId ${roleId} found`);
    return data.permissions;
  }

  static async getAssignedPermission(userId: string) {
    logger.info(`Getting assigned permissions for user with userId ${userId}`);
    const roleId = await this.getRoleId(userId);
    if (!roleId!) {
      logger.error(`roleId for user ${userId} not found`);
      return [];
    }
    const permissions = await this.getAssignedPermissionsForRole(roleId!);
    if (!permissions!) {
      logger.error(`No any permission for user with userId ${userId}`);
      return [];
    }
    return permissions!;
  }
}
