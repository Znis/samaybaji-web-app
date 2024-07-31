import type { Knex } from 'knex';
import { OrderStatus } from '../../enums/order';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .enu('status', [
        OrderStatus.PENDING,
        OrderStatus.COOKING,
        OrderStatus.DELIVERED,
        OrderStatus.EN_ROUTE,
        OrderStatus.CANCELLED,
      ])
      .defaultTo(OrderStatus.PENDING);
    table.date('order_date').notNullable();
    table.time('order_time').notNullable();
    table.enu('payment_method', ['cod', 'online']).notNullable();
    table.string('delivery_address').notNullable();
    table.string('customer_name').notNullable();
    table.string('customer_phone').notNullable();
    table.integer('delivery_amount').notNullable();
    table.integer('discount_amount').notNullable();
    table.integer('total_amount').notNullable();
    table.integer('sub_total_amount').notNullable();
    table.text('notes').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('orders');
}
