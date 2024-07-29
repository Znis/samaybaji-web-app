import { status, type } from '../enums/menuItem';

interface IMenuItem {
  id: string;
  name: string;
  portion: string;
  price: string;
  imageSrc: string;
  isPopular: boolean;
  type: type;
  status: status;
  menuID: string;
}
export interface ICreateMenuItem {
  name: string;
  portion: string;
  price: string;
  imageSrc: string;
  isPopular: boolean;
  type: type;
}
export interface IEditMenuItem {
  name?: string;
  portion?: string;
  price?: string;
  imageSrc?: string;
  isPopular?: boolean;
  type?: type;
  status?: status;
}

export default IMenuItem;
