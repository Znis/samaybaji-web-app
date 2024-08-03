import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('reviews').del();

  // Retrieve user Ids
  const customer3 = await knex('users')
    .select('id')
    .where('name', 'Customer Three')
    .first();
  const customer4 = await knex('users')
    .select('id')
    .where('name', 'Customer Four')
    .first();

  const dishes = await knex('dishes').select('id').limit(2);
  const dish1 = dishes[0]?.id;
  const dish2 = dishes[1]?.id;

  const restaurants = await knex('restaurants').select('id').limit(2);
  const restaurant1 = restaurants[0]?.id;
  const restaurant2 = restaurants[1]?.id;

  await knex('reviews').insert([
    {
      id: knex.raw('uuid_generate_v4()'),
      user_id: customer3.id,
      target_id: dish1,
      target_type: 'dish',
      comment: 'Amazing taste! The best dish I have ever had.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      user_id: customer4.id,
      target_id: dish2,
      target_type: 'dish',
      comment: 'Really good, but a bit spicy for my taste.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      user_id: customer3.id,
      target_id: restaurant1,
      target_type: 'restaurant',
      comment: 'Fantastic atmosphere and great service.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      user_id: customer4.id,
      target_id: restaurant2,
      target_type: 'restaurant',
      comment: 'Decent food, but the service was slow.',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
