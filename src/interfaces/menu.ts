export interface IMenuItemData {
  id: string;
  name: string;
  price: number;
  quantity: string;
  imgSrc: string;
  isPopular: boolean;
}

export interface IRestaurantMenu {
  name: string;
  menu: IMenuItemData[];
}

export interface IPopularMenuData {
  popularMenuData: IMenuItemData[];
}
