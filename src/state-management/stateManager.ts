import Header from '../app-section/header';
import { AppState } from '../interfaces/appState';
import Cart from '../pages/cart/cart';
import MenuPageLayout from '../pages/menu/menuPageLayout';

export class StateManager {
  static state: AppState = StateManager.loadStateFromSessionStorage();

  static updateState<K extends keyof AppState>(key: K, value: AppState[K]) {
    StateManager.state[key] = value;
    StateManager.saveStateToSessionStorage();
    StateManager.renderApp();
  }

  static resetState() {
    StateManager.state = StateManager.getInitialState();
    StateManager.saveStateToSessionStorage();
    StateManager.renderApp();
  }

  static renderApp() {
    Header.init();
  }

  static saveStateToSessionStorage() {
    sessionStorage.setItem('appState', JSON.stringify(StateManager.state));
  }

  static loadStateFromSessionStorage(): AppState {
    const storedState = sessionStorage.getItem('appState');
    if (storedState) {
      try {
        return JSON.parse(storedState) as AppState;
      } catch (error) {
        console.error('Failed to load state from sessionStorage:', error);
      }
    }
    return StateManager.getInitialState();
  }

  static getInitialState(): AppState {
    return {
      accessToken: null,
      user: null,
      cart: [],
    };
  }
}
