interface IMenu {
  id: string;
  name: string;
  description: string;
  restaurantID: string;
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
