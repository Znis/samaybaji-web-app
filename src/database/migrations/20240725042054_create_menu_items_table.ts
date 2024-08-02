import type { Knex } from 'knex';
import { Status } from '../../enums/menuItem';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('menu_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('portion').nullable();
    table.integer('price').notNullable();
    table.string('image_src').notNullable();
    table.boolean('is_popular').notNullable().defaultTo(false);
    table.uuid('menu_id').notNullable();
    table
      .enu('status', [Status.IN_STOCK, Status.OUT_OF_STOCK])
      .defaultTo(Status.IN_STOCK)
      .notNullable();
    table
      .foreign('menu_id')
      .references('id')
      .inTable('menus')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('menu_items');
}
