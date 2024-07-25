import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('menus').del(); // Deletes ALL existing entries

  // Retrieve the IDs of the restaurants
  const restaurants = await knex('restaurants').select('id');

  if (restaurants.length < 2) {
    throw new Error('Not enough restaurants to seed menus.');
  }

  const restaurantIds = restaurants.map((restaurant) => restaurant.id);

  // Insert seed entries
  await knex('menus').insert([
    {
      restaurant_id: restaurantIds[0], // Restaurant 1
      name: 'Newari Special Menu',
      description: 'A special menu featuring traditional Newari dishes.',
    },
    {
      restaurant_id: restaurantIds[1], // Restaurant 2
      name: 'Nepali Feast Menu',
      description: 'A feast of popular Nepali dishes.',
    },
  ]);
}
