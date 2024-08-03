export interface IDish {
  id: string;
  menuItemId: string;
  restaurantId: string;
  menuId: string;
  name: string;
  description: string;
  attributes: string[];
  items: string[];
  imgSrc: string;
  price: number;
  portion: string;
}

export interface ICreateDish {
  name: string;
  description: string;
  attributes: string[];
  items: string[];
  imgSrc: string;
  price: number;
  portion: string;
}

export interface IEditDish {
  name?: string;
  description?: string;
  attributes?: string[];
  items?: string[];
  imgSrc?: string;
  price?: number;
  portion?: string;
}
