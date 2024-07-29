import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../../enums/order';

export async function seed(knex: Knex): Promise<void> {
  await knex('orders').del(); // Deletes ALL existing entries

  const users = await knex('users').select('id').limit(2);
  const restaurants = await knex('restaurants').select('id').limit(2);

  if (users.length < 2 || restaurants.length < 2) {
    throw new Error('Not enough users or restaurants to seed orders');
  }

  const ordersData = [
    {
      id: uuidv4(),
      user_id: users[0].id,
      status: OrderStatus.PENDING,
      sub_total_amount: 700,
      order_date: '2024-07-27',
      order_time: '18:30:00',
      payment_method: 'online',
      delivery_address: '123 Kathmandu Street, Lalitpur, Nepal',
      customer_name: 'Ramesh Shrestha',
      customer_phone: '+977-9812345678',
      delivery_amount: 100,
      total_amount: 550,
      notes: 'Deliver between 6:00 PM and 6:30 PM',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: uuidv4(),
      user_id: users[1].id,
      status: OrderStatus.COOKING,
      sub_total_amount: 700,
      order_date: '2024-07-28',
      order_time: '19:00:00',
      payment_method: 'cod',
      delivery_address: '456 Bhaktapur Road, Kathmandu, Nepal',
      customer_name: 'Sita Tamang',
      customer_phone: '+977-9801234567',
      delivery_amount: 120,
      total_amount: 820,
      notes: 'Please call before delivery',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: uuidv4(),
      user_id: users[0].id,
      status: OrderStatus.EN_ROUTE,
      sub_total_amount: 700,
      order_date: '2024-07-28',
      order_time: '20:00:00',
      payment_method: 'online',
      delivery_address: '789 Patan Durbar Square, Lalitpur, Nepal',
      customer_name: 'Kiran Manandhar',
      customer_phone: '+977-9851234567',
      delivery_amount: 90,
      total_amount: 630,
      notes: 'Extra spicy, please',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: uuidv4(),
      user_id: users[1].id,
      sub_total_amount: 700,
      status: OrderStatus.DELIVERED,
      order_date: '2024-07-29',
      order_time: '21:00:00',
      payment_method: 'cod',
      delivery_address: '321 Thamel, Kathmandu, Nepal',
      customer_name: 'Sunita Rai',
      customer_phone: '+977-9861234567',
      delivery_amount: 110,
      total_amount: 740,
      notes: 'Include extra utensils',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ];

  // Insert seed entries
  await knex('orders').insert(ordersData);
}
