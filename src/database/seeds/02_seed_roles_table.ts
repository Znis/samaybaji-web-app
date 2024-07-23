import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del(); // Deletes ALL existing entries
  await knex('roles').insert([
    { id: '1', name: 'superadmin' },
    { id: '2', name: 'customer' },
    { id: '3', name: 'restaurant' },
  ]);
}
