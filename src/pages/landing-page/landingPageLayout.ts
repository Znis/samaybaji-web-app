import About from './section/about';
import DownloadApp from './section/downloadApp';
import Feedback from './section/feedback';
import Hero from './section/hero';
import Menu from './section/menu';

export default class LandingPage {
  static element: HTMLElement = document.createElement('div');
  static init(): HTMLElement {
    this.element.setAttribute('id', 'landing-page');
    this.element.appendChild(Hero.init());
    this.element.appendChild(Menu.init());
    this.element.appendChild(About.init());
    this.element.appendChild(Feedback.init());
    this.element.appendChild(DownloadApp.init());

    return this.element;
  }
}
