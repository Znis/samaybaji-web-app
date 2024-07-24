import Header from '../app-section/header';
import { ICartItemData } from '../interfaces/cart';
interface AppState {
  accessToken: string | null;
  user: { id: string; name: string; email: string; phoneNumber: string } | null;
  cart: ICartItemData[];
}

export class StateManagement {
  static state: AppState = {
    accessToken: null,
    user: null,
    cart: [],
  };
  static updateState<K extends keyof AppState>(key: K, value: AppState[K]) {
    this.state[key] = value;
    this.render();
  }
  static render() {
    Header.init();
  }
}
