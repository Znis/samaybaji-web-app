import { IMenuItem } from './menuItem';

export interface IMenu {
  id: string;
  name: string;
  description: string;
  restaurantId: string;
  menuItems: IMenuItem[];
}
export interface ICreateMenu {
  name: string;
  description: string;
}
export interface IEditMenu {
  name?: string;
  description?: string;
}
