import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Authorize Model');
export default class AuthorizationModel extends BaseModel {
  /**
   * Retrieves the role ID associated with the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<string | null>} The role ID, or null if an error occurred.
   */
  static getRoleId(userId: string) {
    try {
      return this.queryBuilder()
        .select('role_id')
        .table('users_roles')
        .where('user_id', userId)
        .first();
    } catch (error) {
      logger.error('Model error: ', error);
      return null;
    }
  }

  /**
   * Retrieves the assigned permissions for a given role ID.
   *
   * @param {string} roleId - The ID of the role.
   * @return {Promise<string[] | null>} An array of permission names, or null if an error occurred.
   */
  static getAssignedPermissionsForRole(roleId: string) {
    return this.queryBuilder()
      .from('roles_permissions')
      .join('permissions', 'roles_permissions.permission_id', 'permissions.id')
      .where('roles_permissions.role_id', roleId)
      .select('permissions.name')
      .then((permissions) => {
        return permissions.map((permission) => permission.name);
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
