import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cart_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('cart_id').notNullable();
    table.uuid('menu_item_id').notNullable();
    table.integer('quantity').notNullable().defaultTo(1);

    table
      .foreign('cart_id')
      .references('id')
      .inTable('carts')
      .onDelete('CASCADE');

    table
      .foreign('menu_item_id')
      .references('id')
      .inTable('menu_items')
      .onDelete('CASCADE');

    table.unique(['cart_id', 'menu_item_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cart_items');
}
