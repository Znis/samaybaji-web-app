import { BaseModel } from './base';

export default class AuthorizationModel extends BaseModel {
  static getRoleId(userId: string) {
    try {
      return this.queryBuilder()
        .select('role_id')
        .table('users_roles')
        .where('user_id', userId)
        .first();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

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
        console.log(error);
        return null;
      });
  }
}
