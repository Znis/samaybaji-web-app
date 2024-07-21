export interface menuItemData {
  id: string;
  name: string;
  price: number;
  quantity: string;
  imgSrc: string;
  isPopular: boolean;
}

export interface restaurantMenu {
  name: string;
  menu: menuItemData[];
}

export interface popularMenuData {
  popularMenuData: menuItemData[];
}
