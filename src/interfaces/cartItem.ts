interface ICartItem {
  id: string;
  menuItemID: string;
  quantity: number;
}
export interface ICreateCartItemData {
  menuItemID: string;
  quantity: number;
}
export interface IEditCartItemData {
  quantity: number;
}

export default ICartItem;
