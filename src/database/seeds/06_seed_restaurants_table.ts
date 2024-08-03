import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import minioClient from '../../minioFile';
import config from '../../config';
export async function seed(knex: Knex): Promise<void> {
  await knex('restaurants').del(); // Deletes ALL existing entries

  // Retrieve user Ids
  const customer1 = await knex('users')
    .select('id')
    .where('name', 'Customer One')
    .first();
  const customer2 = await knex('users')
    .select('id')
    .where('name', 'Customer Two')
    .first();

  const RESTAURANT_IMAGE_PATH = path.resolve(
    __dirname,
    '../../../assets/images/restaurants',
  );

  async function uploadImageAndGetUUID(imagePath: string): Promise<string> {
    const imageUUID = uuidv4();
    const image = await fs.promises.readFile(imagePath);
    await minioClient.putObject(
      config.minio.MINIO_BUCKET_NAME,
      imageUUID,
      image,
    );
    return imageUUID;
  }
  // Retrieve role Id of customer_with_restaurant
  const roles = await knex('roles').select('id', 'name');

  const roleMap = new Map(roles.map((role) => [role.name, role.id]));

  const customerWithRestaurantRoleId = roleMap.get('customer_with_restaurant');

  if (!customerWithRestaurantRoleId) {
    throw new Error('Role Id not found in the roles table');
  }

  // Update user roles
  try {
    await knex('users_roles')
      .update({ role_id: customerWithRestaurantRoleId })
      .where('user_id', customer1.id);
    await knex('users_roles')
      .update({ role_id: customerWithRestaurantRoleId })
      .where('user_id', customer2.id);
  } catch {
    throw new Error('Could not update user roles');
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
      profile_pic: await uploadImageAndGetUUID(
        path.join(RESTAURANT_IMAGE_PATH, 'restaurant1.jpg'),
      ),
      cover_pic: await uploadImageAndGetUUID(
        path.join(RESTAURANT_IMAGE_PATH, 'restaurant1.jpg'),
      ),
      pan_number: '1234567890',
      user_id: customer1.id,
    },
    {
      name: 'Newari Restaurant 2',
      description: 'Traditional Newari food',
      location: 'Bhaktapur',
      contact_number: '9823456789',
      open_hours: '11:00 AM - 11:00 PM',
      rating: 5,
      profile_pic: await uploadImageAndGetUUID(
        path.join(RESTAURANT_IMAGE_PATH, 'restaurant2.jpg'),
      ),
      cover_pic: await uploadImageAndGetUUID(
        path.join(RESTAURANT_IMAGE_PATH, 'restaurant2.jpg'),
      ),
      pan_number: '0987654321',
      user_id: customer2.id,
    },
  ]);
}
