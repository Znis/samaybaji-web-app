import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('dishes').del();

  const menuItems = await knex('menu_items').select('*');
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
      img_src: menuItems[0].image_src,
      price: 150,
      portion: '1 Plate',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      menu_item_id: menuItems[1].id,
      restaurant_id: restaurants[0].id,
      menu_id: menus[0].id,
      name: 'Chatamari',
      description:
        'A rice flour crepe topped with minced meat, egg, and vegetables.',
      attributes: ['Savory', 'Grilled', 'Traditional'],
      items: ['Rice Flour', 'Minced Meat', 'Egg', 'Vegetables'],
      img_src: menuItems[1].image_src,
      price: 200,
      portion: '1 Plate',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      menu_item_id: menuItems[2].id,
      restaurant_id: restaurants[1].id,
      menu_id: menus[1].id,
      name: 'Bara',
      description:
        'Savory lentil patties often served with egg or minced meat.',
      attributes: ['Savory', 'Fried', 'Traditional'],
      items: ['Lentils', 'Egg', 'Minced Meat'],
      img_src: menuItems[2].image_src,
      price: 100,
      portion: '1 Plate',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      menu_item_id: menuItems[3].id,
      restaurant_id: restaurants[1].id,
      menu_id: menus[1].id,
      name: 'Sukuti',
      description:
        'Dry meat often served as an appetizer or with traditional snacks.',
      attributes: ['Savory', 'Dried', 'Traditional'],
      items: ['Buffalo Meat', 'Spices'],
      img_src: menuItems[3].image_src,
      price: 250,
      portion: '100 grams',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      menu_item_id: menuItems[4].id,
      restaurant_id: restaurants[0].id,
      menu_id: menus[0].id,
      name: 'Wo',
      description: 'A lentil pancake that is both savory and satisfying.',
      attributes: ['Savory', 'Fried', 'Traditional'],
      items: ['Lentils', 'Spices'],
      img_src: menuItems[4].image_src,
      price: 120,
      portion: '1 Plate',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
