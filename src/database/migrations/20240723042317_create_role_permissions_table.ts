import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('role_permissions', (table) => {
    table.uuid('id').primary();
    table
      .uuid('role_id')
      .references('id')
      .inTable('roles')
      .notNullable()
      .onDelete('CASCADE');
    table
      .uuid('permission_id')
      .references('id')
      .inTable('permissions')
      .notNullable()
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('role_permissions');
}
