import Content from './app-section/content';
import Footer from './app-section/footer';
import Header from './app-section/header';

export default class AppLayout {
  static render(): void {
    const appElement: HTMLElement | null = document.getElementById('app');
    if (appElement) {
      const darkBackgroundOverlay = document.createElement('div');
      darkBackgroundOverlay.setAttribute('id', 'dark-background-overlay');
      appElement.appendChild(darkBackgroundOverlay);

      const modal = document.createElement('div');
      modal.setAttribute('id', 'modal');
      appElement.appendChild(modal);

      appElement.appendChild(Header.render());
      appElement.appendChild(Content.render());
      appElement.appendChild(Footer.render());
    }
  }
}
