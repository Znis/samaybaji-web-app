import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}
export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  // Retrieve role IDs
  const roles = await knex('roles').select('id', 'name');
  const roleMap = new Map(roles.map((role) => [role.name, role.id]));

  const superadminRoleId = roleMap.get('superadmin');
  const customerRoleId = roleMap.get('customer');

  if (!superadminRoleId || !customerRoleId) {
    throw new Error('Role IDs not found in the roles table');
  }

  // Hash passwords
  const superadminPassword = 'Admin$';
  const superadminPasswordHash = await hashPassword(superadminPassword);

  const customerPasswords = await Promise.all([
    hashPassword('Customer1$'),
    hashPassword('Customer2$'),
    hashPassword('Customer3$'),
    hashPassword('Customer4$'),
  ]);

  // Inserts seed entries
  await knex('users').insert([
    {
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@admin.com',
      phone_number: '1111111111',
      password_hash: superadminPasswordHash,
    },
    {
      id: uuidv4(),
      name: 'Customer One',
      image_src: '/assets/images/profiles/sakura.jpg',
      email: 'customer1@example.com',
      phone_number: '2222222222',
      password_hash: customerPasswords[0],
    },
    {
      id: uuidv4(),
      name: 'Customer Two',
      email: 'customer2@example.com',
      phone_number: '3333333333',
      password_hash: customerPasswords[1],
    },
    {
      id: uuidv4(),
      name: 'Customer Three',
      image_src: '/assets/images/profiles/sakura.jpg',
      email: 'customer3@example.com',
      phone_number: '4444444444',
      password_hash: customerPasswords[2],
    },
    {
      id: uuidv4(),
      name: 'Customer Four',
      email: 'customer4@example.com',
      phone_number: '5555555555',
      password_hash: customerPasswords[3],
    },
  ]);

  try {
    const users = await knex('users').select('id');
    if (!users.length) throw new Error('Could not query the users');

    const userIds = users.map((user) => user.id);
    userIds.forEach(async (userId) => {
      await knex('carts').insert({ user_id: userId });
    });
  } catch {
    throw new Error('Could not add cart to user');
  }
}
