export interface IDish {
  id: string;
  menuItemID: string;
  restaurantID: string;
  menuID: string;
  name: string;
  description: string;
  attributes: string[];
  items: string[];
  imgSrc: string;
  price: number;
  portion: string;
}

export interface ICreateDish {
  menuItemID: string;
  restaurantID: string;
  menuID: string;
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
