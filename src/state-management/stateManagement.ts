import Header from '../app-section/header';

interface AppState {
  accessToken: string | null;
  user: { id: string; name: string; email: string; phoneNumber: string } | null;
}

export class StateManagement {
  static state: AppState = this.loadStateFromSessionStorage();

  static updateState<K extends keyof AppState>(key: K, value: AppState[K]) {
    this.state[key] = value;
    this.saveStateToSessionStorage();
    this.render();
  }

  static render() {
    Header.init();
  }

  static saveStateToSessionStorage() {
    sessionStorage.setItem('appState', JSON.stringify(this.state));
  }

  static loadStateFromSessionStorage(): AppState {
    const storedState = sessionStorage.getItem('appState');
    if (!storedState) return this.getInitialState();

    try {
      return JSON.parse(storedState) as AppState;
    } catch (error) {
      console.error('Failed to parse state from sessionStorage:', error);
      return this.getInitialState();
    }
  }

  static getInitialState(): AppState {
    return {
      accessToken: null,
      user: null,
    };
  }
}
