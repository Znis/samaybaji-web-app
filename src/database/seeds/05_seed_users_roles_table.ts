import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('users_roles').del();

  const users = await knex('users').select('id', 'name');
  const roles = await knex('roles').select('id', 'name');

  const userMap = new Map(users.map((user) => [user.name, user.id]));
  const roleMap = new Map(roles.map((role) => [role.name, role.id]));

  const superadminRoleId = roleMap.get('superadmin');
  const customerRoleId = roleMap.get('customer');

  if (!superadminRoleId || !customerRoleId) {
    throw new Error('Role IDs not found in the roles table');
  }

  const adminId = userMap.get('Admin');
  const customerIds = [
    userMap.get('Customer One'),
    userMap.get('Customer Two'),
    userMap.get('Customer Three'),
    userMap.get('Customer Four'),
  ];

  if (!adminId || customerIds.some((id) => id === undefined)) {
    throw new Error('User IDs not found in the users table');
  }

  await knex('users_roles').insert([
    {
      id: uuidv4(),
      user_id: adminId,
      role_id: superadminRoleId,
    },
    ...customerIds.map((customerId) => ({
      id: uuidv4(),
      user_id: customerId,
      role_id: customerRoleId,
    })),
  ]);
}
