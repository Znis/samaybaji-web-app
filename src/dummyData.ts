import { ICartData } from './interfaces/cart';
import { ICustomerReviewData, IDishDetailData } from './interfaces/dishDetail';
import {
  IMenuItemData,
  IPopularMenuData,
  IRestaurantMenu,
} from './interfaces/menu';

// dummy data
const menuItemData: IMenuItemData[] = [
  {
    id: '1',
    name: 'Yomari',
    price: 150,
    quantity: '1 piece',
    imgSrc: 'images/yomari.jpg',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Chatamari',
    price: 200,
    quantity: '1 piece',
    imgSrc: 'images/chatamari.jpg',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Bara',
    price: 100,
    quantity: '1 piece',
    imgSrc: 'images/bara.jpg',
    isPopular: false,
  },
  {
    id: '4',
    name: 'Sukuti',
    price: 250,
    quantity: '100 grams',
    imgSrc: 'images/sukuti.jpg',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Wo',
    price: 120,
    quantity: '1 piece',
    imgSrc: 'images/wo.jpg',
    isPopular: false,
  },
];

const restaurantMenus: IRestaurantMenu[] = [
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

const customerReviews: ICustomerReviewData[] = [
  {
    name: 'Suman Shrestha',
    comment:
      'Yomari was absolutely delicious! The filling was perfectly sweet.',
    postedDate: '2024-07-01',
    profileImgSrc: 'profiles/suman.jpg',
  },
  {
    name: 'Anita Rai',
    comment:
      'Chatamari was fantastic, loved the crispy edges and the savory toppings.',
    postedDate: '2024-07-05',
    profileImgSrc: 'profiles/anita.jpg',
  },
  {
    name: 'Prakash Maharjan',
    comment:
      'Bara was okay, a bit too oily for my taste but the flavor was good.',
    postedDate: '2024-07-10',
    profileImgSrc: 'profiles/prakash.jpg',
  },
  {
    name: 'Mina Tamang',
    comment: 'Sukuti was a perfect snack with beer, highly recommend it.',
    postedDate: '2024-07-12',
    profileImgSrc: 'profiles/mina.jpg',
  },
  {
    name: 'Rajesh Shakya',
    comment: 'Wo was soft and flavorful, great as a breakfast item.',
    postedDate: '2024-07-15',
    profileImgSrc: 'profiles/rajesh.jpg',
  },
];

const cartData: ICartData = {
  cartItems: [
    {
      menuItem: menuItemData[0],
      quantity: 2,
    },
    {
      menuItem: menuItemData[2],
      quantity: 1,
    },
  ],
};

const popularMenuData: IPopularMenuData = {
  popularMenuData: [menuItemData[0], menuItemData[1], menuItemData[3]],
};

const dishDetailData: IDishDetailData = {
  id: '1',
  name: 'Yomari',
  description: 'Steamed dumplings filled with sweet molasses and sesame seeds.',
  attributes: ['Sweet', 'Steamed', 'Traditional'],
  items: ['Molasses', 'Sesame Seeds', 'Rice Flour'],
  imgSrc: 'images/yomari.jpg',
  price: 150,
  quantity: 1,
  rating: 4.5,
  totalReviews: 5,
  customerReviews: [
    customerReviews[0],
    customerReviews[1],
    customerReviews[2],
    customerReviews[3],
    customerReviews[4],
  ],
};

export {
  menuItemData,
  restaurantMenus,
  customerReviews,
  cartData,
  popularMenuData,
  dishDetailData,
};
