interface IMenu {
  id: string;
  name: string;
  description: string;
  restaurantID: string;
}
export interface ICreateMenuData {
  name: string;
  description: string;
}
export interface IEditMenuData {
  name?: string;
  description?: string;
}

export default IMenu;
