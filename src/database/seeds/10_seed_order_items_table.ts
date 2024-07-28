import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { OrderItemStatus } from '../../enums/order';

export async function seed(knex: Knex): Promise<void> {
  await knex('order_items').del(); // Deletes ALL existing entries

  const orders = await knex('orders').select('id').limit(4);
  const menuItems = await knex('menu_items').select('id').limit(5);

  if (orders.length < 4 || menuItems.length < 5) {
    throw new Error('Not enough orders or menu items to seed order items');
  }

  const orderItemsData = [
    {
      id: uuidv4(),
      order_id: orders[0].id,
      menu_item_id: menuItems[0].id,
      quantity: 2,
      unit_price: 300,
      status: OrderItemStatus.PENDING,
      notes: 'test notes',
    },
    {
      id: uuidv4(),
      order_id: orders[0].id,
      menu_item_id: menuItems[1].id,
      quantity: 1,
      unit_price: 200,
      status: OrderItemStatus.PENDING,
      notes: 'test notes',
    },
    {
      id: uuidv4(),
      order_id: orders[1].id,
      menu_item_id: menuItems[2].id,
      quantity: 3,
      unit_price: 300,
      status: OrderItemStatus.COOKING,
      notes: 'test notes',
    },
    {
      id: uuidv4(),
      order_id: orders[1].id,
      menu_item_id: menuItems[3].id,
      quantity: 1,
      unit_price: 250,
      status: OrderItemStatus.READY,
      notes: 'test notes',
    },
    {
      id: uuidv4(),
      order_id: orders[2].id,
      menu_item_id: menuItems[4].id,
      quantity: 2,
      unit_price: 500,
      status: OrderItemStatus.READY,
      notes: 'test notes',
    },
    {
      id: uuidv4(),
      order_id: orders[3].id,
      menu_item_id: menuItems[1].id,
      quantity: 1,
      unit_price: 200,
      status: OrderItemStatus.COOKING,
      notes: 'test notes',
    },
  ];

  // Insert order items data
  await knex('order_items').insert(orderItemsData);
}
