import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('dishes').del();

  const menuItems = await knex('menu_items').select('id').limit(2);
  const restaurants = await knex('restaurants').select('id').limit(2);
  const menus = await knex('menus').select('id').limit(2);

  await knex('dishes').insert([
    {
      id: uuidv4(),
      menu_item_id: menuItems[0].id,
      restaurant_id: restaurants[0].id,
      menu_id: menus[0].id,
      name: 'Yomari',
      description:
        'Steamed dumplings filled with sweet molasses and sesame seeds.',
      attributes: ['Sweet', 'Steamed', 'Traditional'],
      items: ['Molasses', 'Sesame Seeds', 'Rice Flour'],
      img_src: '/assets/images/dish/yomari.jpeg',
      price: 150,
      portion: '1 Plate',
      rating: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      menu_item_id: menuItems[1].id,
      restaurant_id: restaurants[1].id,
      menu_id: menus[1].id,
      name: 'Chatamari',
      description: 'A traditional Newari pizza-like dish made from rice flour.',
      attributes: ['Savory', 'Fried', 'Traditional'],
      items: ['Rice Flour', 'Egg', 'Minced Meat', 'Vegetables'],
      img_src: '/assets/images/dish/chatamari.jpeg',
      price: 200,
      portion: '1 Plate',
      rating: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
