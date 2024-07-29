import IMenuItem from './menuItem';

interface IMenu {
  id: string;
  name: string;
  description: string;
  restaurantID: string;
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

export default IMenu;
