import { Status } from '../enums/menuItem';

export interface IMenuItem {
  id: string;
  name: string;
  portion: string;
  price: number;
  imageSrc: string;
  isPopular: boolean;
  status: Status;
  menuId: string;
}
export interface ICreateMenuItem {
  name: string;
  portion: string;
  price: number;
  imageSrc: string;
  isPopular: boolean;
}
export interface IEditMenuItem {
  name?: string;
  portion?: string;
  price?: number;
  imageSrc?: string;
  isPopular?: boolean;
  status?: Status;
}
export default IMenuItem;
