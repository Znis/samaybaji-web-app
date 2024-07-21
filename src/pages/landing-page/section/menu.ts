import MenuItem from '../../../components/menuItem';
import { popularMenuData } from '../../../dummyData';

export default class Menu {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/menu.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('menu');
          this.element.innerHTML = html;
          this.render();
        });
    }
    return this.element;
  }
  static render() {
    popularMenuData.popularMenuData.forEach((item) => {
      const menuItem = new MenuItem(
        item.id,
        item.name,
        item.imgSrc,
        item.portion,
        item.price,
        item.isPopular,
        'large',
      );
      document.getElementById('menu-list')!.appendChild(menuItem.element);
    });
  }
}
