import type { Knex } from 'knex';
import { OrderItemStatus } from '../../enums/order';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .uuid('menu_item_id')
      .notNullable()
      .references('id')
      .inTable('menu_items');
    table
      .enu('status', [
        OrderItemStatus.PENDING,
        OrderItemStatus.COOKING,
        OrderItemStatus.READY,
        OrderItemStatus.CANCELLED,
      ])
      .defaultTo(OrderItemStatus.PENDING);
    table.integer('quantity').notNullable();
    table.integer('unit_price').notNullable();
    table.text('notes').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_items');
}
