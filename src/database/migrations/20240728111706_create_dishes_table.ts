import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('dishes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('menu_item_id').notNullable();
    table.uuid('restaurant_id').notNullable();
    table.uuid('menu_id').notNullable();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.specificType('attributes', 'text ARRAY').nullable();
    table.specificType('items', 'text ARRAY').nullable();
    table.string('img_src').nullable();
    table.integer('price').notNullable();
    table.string('portion').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('menu_item_id')
      .references('id')
      .inTable('menu_items')
      .onDelete('CASCADE');
    table
      .foreign('restaurant_id')
      .references('id')
      .inTable('restaurants')
      .onDelete('CASCADE');
    table
      .foreign('menu_id')
      .references('id')
      .inTable('menus')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('dishes');
}
