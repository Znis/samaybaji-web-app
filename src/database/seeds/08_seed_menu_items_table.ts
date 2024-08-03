import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import minioClient from '../../minioFile';
import config from '../../config';

const DISH_IMAGE_PATH = __dirname + '../../../../assets/images/dishes/';

async function uploadImageAndGetUUID(imagePath: string): Promise<string> {
  const imageUUID = uuidv4();
  const image = await fs.promises.readFile(imagePath);
  await minioClient.putObject(config.minio.MINIO_BUCKET_NAME, imageUUID, image);
  return imageUUID;
}

export async function seed(knex: Knex): Promise<void> {
  await knex('menu_items').del(); // Deletes ALL existing entries

  // Retrieve the Ids of the menus
  const menus = await knex('menus').select('id');

  if (menus.length < 2) {
    throw new Error('Not enough menus to seed menu items.');
  }

  const menuIds = menus.map((menu) => menu.id);

  // Insert seed entries for menu items
  await knex('menu_items').insert([
    {
      id: uuidv4(),
      name: 'Yomari',
      price: 150,
      portion: '1 piece',
      image_src: await uploadImageAndGetUUID(
        path.join(DISH_IMAGE_PATH, 'yomari.png'),
      ),
      is_popular: true,
      menu_id: menuIds[0],
      status: 'In Stock',
    },
    {
      id: uuidv4(),
      name: 'Chatamari',
      price: 200,
      portion: '1 piece',
      image_src: await uploadImageAndGetUUID(
        path.join(DISH_IMAGE_PATH, 'chatamari.jpg'),
      ),
      is_popular: true,
      menu_id: menuIds[0],
      status: 'In Stock',
    },
    {
      id: uuidv4(),
      name: 'Bara',
      price: 100,
      portion: '1 piece',
      image_src: await uploadImageAndGetUUID(
        path.join(DISH_IMAGE_PATH, 'bara.png'),
      ),
      is_popular: false,
      menu_id: menuIds[1],
      status: 'In Stock',
    },
    {
      id: uuidv4(),
      name: 'Sukuti',
      price: 250,
      portion: '100 grams',
      image_src: await uploadImageAndGetUUID(
        path.join(DISH_IMAGE_PATH, 'sukuti.jpg'),
      ),
      is_popular: true,
      menu_id: menuIds[1],
      status: 'In Stock',
    },
    {
      id: uuidv4(),
      name: 'Wo',
      price: 120,
      portion: '1 piece',
      image_src: await uploadImageAndGetUUID(
        path.join(DISH_IMAGE_PATH, 'wo.jpg'),
      ),
      is_popular: false,
      menu_id: menuIds[0],
      status: 'Out of Stock',
    },
  ]);
}
