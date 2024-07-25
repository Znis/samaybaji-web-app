import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('roles_permissions').del(); // Deletes ALL existing entries
  await knex('roles_permissions').insert([
    // superadmin permissions
    { id: uuidv4(), role_id: '1', permission_id: '1' },
    { id: uuidv4(), role_id: '1', permission_id: '2' },
    { id: uuidv4(), role_id: '1', permission_id: '3' },
    { id: uuidv4(), role_id: '1', permission_id: '4' },
    { id: uuidv4(), role_id: '1', permission_id: '6' },
    { id: uuidv4(), role_id: '1', permission_id: '7' },
    { id: uuidv4(), role_id: '1', permission_id: '8' },
    { id: uuidv4(), role_id: '1', permission_id: '10' },
    { id: uuidv4(), role_id: '1', permission_id: '11' },
    { id: uuidv4(), role_id: '1', permission_id: '12' },
    { id: uuidv4(), role_id: '1', permission_id: '14' },
    { id: uuidv4(), role_id: '1', permission_id: '15' },
    { id: uuidv4(), role_id: '1', permission_id: '16' },
    { id: uuidv4(), role_id: '1', permission_id: '17' },
    { id: uuidv4(), role_id: '1', permission_id: '18' },
    { id: uuidv4(), role_id: '1', permission_id: '21' },
    { id: uuidv4(), role_id: '1', permission_id: '22' },
    { id: uuidv4(), role_id: '1', permission_id: '23' },
    { id: uuidv4(), role_id: '1', permission_id: '24' },

    // customer permissions
    { id: uuidv4(), role_id: '2', permission_id: '2' },
    { id: uuidv4(), role_id: '2', permission_id: '3' },
    { id: uuidv4(), role_id: '2', permission_id: '4' },
    { id: uuidv4(), role_id: '2', permission_id: '5' },
    { id: uuidv4(), role_id: '2', permission_id: '8' },
    { id: uuidv4(), role_id: '2', permission_id: '9' },
    { id: uuidv4(), role_id: '2', permission_id: '10' },
    { id: uuidv4(), role_id: '2', permission_id: '11' },
    { id: uuidv4(), role_id: '2', permission_id: '12' },
    { id: uuidv4(), role_id: '2', permission_id: '13' },
    { id: uuidv4(), role_id: '2', permission_id: '14' },
    { id: uuidv4(), role_id: '2', permission_id: '15' },
    { id: uuidv4(), role_id: '2', permission_id: '16' },
    { id: uuidv4(), role_id: '2', permission_id: '17' },
    { id: uuidv4(), role_id: '2', permission_id: '18' },

    // restaurant permissions
    { id: uuidv4(), role_id: '3', permission_id: '2' },
    { id: uuidv4(), role_id: '3', permission_id: '3' },
    { id: uuidv4(), role_id: '3', permission_id: '4' },
    { id: uuidv4(), role_id: '3', permission_id: '5' },
    { id: uuidv4(), role_id: '3', permission_id: '8' },
    { id: uuidv4(), role_id: '3', permission_id: '9' },
    { id: uuidv4(), role_id: '3', permission_id: '10' },
    { id: uuidv4(), role_id: '3', permission_id: '11' },
    { id: uuidv4(), role_id: '3', permission_id: '12' },
    { id: uuidv4(), role_id: '3', permission_id: '13' },
    { id: uuidv4(), role_id: '3', permission_id: '14' },
    { id: uuidv4(), role_id: '3', permission_id: '15' },
    { id: uuidv4(), role_id: '3', permission_id: '16' },
    { id: uuidv4(), role_id: '3', permission_id: '17' },
    { id: uuidv4(), role_id: '3', permission_id: '18' },
    { id: uuidv4(), role_id: '3', permission_id: '19' },
    { id: uuidv4(), role_id: '3', permission_id: '20' },
    { id: uuidv4(), role_id: '3', permission_id: '6' },
    { id: uuidv4(), role_id: '3', permission_id: '7' },
  ]);
}
