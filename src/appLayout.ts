import Content from './app-section/content';
import Footer from './app-section/footer';
import Header from './app-section/header';

export default class AppLayout {
  static init(): void {
    const appElement: HTMLElement | null = document.getElementById('app');
    if (appElement) {
      const backgroundOverlay = document.createElement('div');
      backgroundOverlay.setAttribute('id', 'background-overlay');
      appElement.appendChild(backgroundOverlay);

      const modal = document.createElement('div');
      modal.setAttribute('id', 'modal');
      appElement.appendChild(modal);

      appElement.appendChild(Header.init());
      appElement.appendChild(Content.init());
      appElement.appendChild(Footer.init());
    }
  }
}
