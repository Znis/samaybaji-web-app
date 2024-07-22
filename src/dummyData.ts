import { ICustomerReviewData, IDishDetailData } from './interfaces/dishDetail';
import {
  IMenuItemData,
  IPopularMenuData,
  IRestaurantMenu,
} from './interfaces/menu';

// dummy data
export const menuItemData: IMenuItemData[] = [
  {
    id: '1',
    name: 'Yomari',
    price: 150,
    portion: '1 piece',
    imgSrc: './assets/images/dish/yomari.jpeg',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Chatamari',
    price: 200,
    portion: '1 piece',
    imgSrc: './assets/images/dish/chatamari.jpg',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Bara',
    price: 100,
    portion: '1 piece',
    imgSrc: './assets/images/dish/bara.png',
    isPopular: false,
  },
  {
    id: '4',
    name: 'Sukuti',
    price: 250,
    portion: '100 grams',
    imgSrc: './assets/images/dish/sukuti.jpg',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Wo',
    price: 120,
    portion: '1 piece',
    imgSrc: './assets/images/dish/wo.jpg',
    isPopular: false,
  },
];

export const popularMenuData: IPopularMenuData = {
  popularMenuData: menuItemData.filter((item) => item.isPopular),
};

export const restaurantMenus: IRestaurantMenu[] = [
  {
    name: 'Newari Delights',
    menu: [menuItemData[0], menuItemData[2], menuItemData[4]],
  },
  {
    name: 'Bhojan Ghar',
    menu: [menuItemData[1], menuItemData[3]],
  },
  {
    name: 'Lahana',
    menu: [menuItemData[0], menuItemData[1], menuItemData[2]],
  },
];

export const customerReviews: ICustomerReviewData[] = [
  {
    name: 'Suman Shrestha',
    comment:
      'Yomari was absolutely delicious! The filling was perfectly sweet.',
    postedDate: '2024-07-01',
    profileImgSrc: './assets/images/profiles/gojo.png',
  },
  {
    name: 'Anita Rai',
    comment:
      'Chatamari was fantastic, loved the crispy edges and the savory toppings.',
    postedDate: '2024-07-05',
    profileImgSrc: './assets/images/profiles/sakura.jpg',
  },
  {
    name: 'Prakash Maharjan',
    comment:
      'Bara was okay, a bit too oily for my taste but the flavor was good.',
    postedDate: '2024-07-10',
    profileImgSrc: './assets/images/profiles/spiderman.jpg',
  },
  {
    name: 'Mina Tamang',
    comment: 'Sukuti was a perfect snack with beer, highly recommend it.',
    postedDate: '2024-07-12',
    profileImgSrc: './assets/images/profiles/nishimiya.jpeg',
  },
  {
    name: 'Rajesh Shakya',
    comment: 'Wo was soft and flavorful, great as a breakfast item.',
    postedDate: '2024-07-15',
    profileImgSrc: './assets/images/profiles/ironman.jfif',
  },
];

export const dishDetailArray: IDishDetailData[] = [
  {
    id: '1',
    name: 'Yomari',
    description:
      'Steamed dumplings filled with sweet molasses and sesame seeds.',
    attributes: ['Sweet', 'Steamed', 'Traditional'],
    items: ['Molasses', 'Sesame Seeds', 'Rice Flour'],
    imgSrc: './assets/images/dish/yomari.jpeg',
    price: 150,
    portion: '1 Plate',
    rating: 3,
    totalReviews: 5,
    customerReviews: [
      customerReviews[0],
      customerReviews[1],
      customerReviews[2],
      customerReviews[3],
      customerReviews[4],
    ],
  },
];
