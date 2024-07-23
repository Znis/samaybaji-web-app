import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('role_permissions').del(); // Deletes ALL existing entries
  await knex('role_permissions').insert([
    // superadmin permissions
    { id: '1', role_id: '1', permission_id: '1' },
    { id: '2', role_id: '1', permission_id: '2' },
    { id: '3', role_id: '1', permission_id: '3' },
    { id: '4', role_id: '1', permission_id: '4' },
    { id: '5', role_id: '1', permission_id: '5' },
    { id: '6', role_id: '1', permission_id: '6' },
    { id: '7', role_id: '1', permission_id: '7' },
    { id: '8', role_id: '1', permission_id: '8' },
    { id: '10', role_id: '1', permission_id: '10' },
    { id: '12', role_id: '1', permission_id: '12' },
    { id: '14', role_id: '1', permission_id: '14' },

    // customer permissions
    { id: '20', role_id: '2', permission_id: '14' },
    { id: '21', role_id: '2', permission_id: '15' },
    { id: '22', role_id: '2', permission_id: '13' },
    { id: '23', role_id: '2', permission_id: '16' },
    { id: '24', role_id: '2', permission_id: '18' },
    { id: '25', role_id: '2', permission_id: '11' },
    { id: '26', role_id: '2', permission_id: '9' },
    { id: '27', role_id: '2', permission_id: '8' },

    // restaurant permissions
    { id: '28', role_id: '3', permission_id: '6' },
    { id: '29', role_id: '3', permission_id: '7' }, // Edit Restaurant Details
    { id: '30', role_id: '3', permission_id: '17' },
    { id: '31', role_id: '3', permission_id: '18' },
    { id: '32', role_id: '3', permission_id: '19' },
    { id: '33', role_id: '3', permission_id: '12' },
  ]);
}
