import { fetchAllMenus } from '../../../apiCalls';
import { LoaderSpinner } from '../../../components/loaderSpinner';
import MenuItem from '../../../components/menuItem';
import { IMenu } from '../../../interfaces/menu';

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
          const spinner = LoaderSpinner.render(50);
          this.element.appendChild(spinner);
          this.fetchMenus(spinner);
        });
    }
    return this.element;
  }
  static async fetchMenus(spinner: HTMLElement) {
    try {
      const menu = await fetchAllMenus();
      this.renderMenu(menu[0]);
      console.log(menu);
    } catch (error) {
      this.element.innerHTML = `<h3>${error}</h3>`;
    } finally {
      spinner.remove();
    }
  }
  static renderMenu(menu: IMenu) {
    const menuListContainer = this.element.querySelector(
      '#menu-list',
    ) as HTMLDivElement;
    menuListContainer.innerHTML = '';
    menu.menuItems.forEach((item) => {
      const menuItem = new MenuItem(item, 'large');
      menuListContainer.appendChild(menuItem.element);
    });
  }
}
