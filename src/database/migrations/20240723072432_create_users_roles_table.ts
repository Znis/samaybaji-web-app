import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_roles', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().unique();
    table.integer('role_id').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users_roles');
}
