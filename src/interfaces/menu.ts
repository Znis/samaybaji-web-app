export interface IMenuItemData {
  id: string;
  name: string;
  price: number;
  portion: string;
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
