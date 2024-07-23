import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable('roles_permissions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('role_id').notNullable();
    table.integer('permission_id').notNullable();

    table
      .foreign('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table
      .foreign('permission_id')
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('roles_permissions');
}
