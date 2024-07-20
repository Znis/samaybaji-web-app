import Header from './app-section/header';

export default class AppLayout {
  static render(): void {
    const appElement: HTMLElement | null = document.getElementById('app');
    if (appElement) {
      appElement.appendChild(Header.render());
    }
  }
}
