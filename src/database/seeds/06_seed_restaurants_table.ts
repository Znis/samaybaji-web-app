import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('restaurants').del(); // Deletes ALL existing entries

  // Retrieve user IDs
  const users = await knex('users')
    .select('id')
    .orderBy('id')
    .offset(1) // Skip the first user as it is SUPERADMIN
    .limit(2); // Retrieve 2 users (2nd and 3rd)

  const userIds = users.map((user) => user.id);

  if (userIds.length < 2) {
    throw new Error('Not enough users to seed restaurants.');
  }

  // Insert seed entries
  await knex('restaurants').insert([
    {
      name: 'Newari Restaurant 1',
      description: 'Authentic Newari dishes',
      location: 'Kathmandu',
      contact_number: '9812345678',
      open_hours: '10:00 AM - 10:00 PM',
      rating: 4,
      profile_pic: '/assets/images/dish/wo.jpg',
      cover_pic: '/assets/images/dish/wo.jpg',
      pan_number: '1234567890',
      user_id: userIds[0],
    },
    {
      name: 'Newari Restaurant 2',
      description: 'Traditional Newari food',
      location: 'Bhaktapur',
      contact_number: '9823456789',
      open_hours: '11:00 AM - 11:00 PM',
      rating: 5,
      profile_pic: '/assets/images/dish/wo.jpg',
      cover_pic: '/assets/images/dish/wo.jpg',
      pan_number: '0987654321',
      user_id: userIds[1],
    },
  ]);
}
