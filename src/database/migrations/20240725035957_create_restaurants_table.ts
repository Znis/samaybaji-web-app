import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('restaurants', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('description').notNullable();
    table.string('location').notNullable();
    table.string('contact_number').notNullable();
    table.string('open_hours').notNullable();
    table.integer('rating').notNullable();
    table.string('profile_pic').nullable();
    table.string('cover_pic').nullable();
    table.string('pan_number').notNullable().unique();
    table.uuid('user_id').notNullable().unique();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('restaurants');
}
