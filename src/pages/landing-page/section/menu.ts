import { fetchPopularMenuItems } from '../../../api-routes/menuItem';
import { LoaderSpinner } from '../../../components/loaderSpinner';
import MenuItem from '../../../components/menuItem';
import IMenuItem from '../../../interfaces/menuItem';

export default class Menu {
  static htmlTemplateurl =
    '/assets/templates/pages/landing-page/section/menu.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('menu');
          this.element.innerHTML = html;
          const spinner = LoaderSpinner.render(50);
          const spinnerMessage = document.createElement('p');
          spinnerMessage.className = 'spinner-message';
          spinnerMessage.textContent =
            'The Backend Server may take around a minute to boot up. Please wait.';
          this.element.appendChild(spinner);
          this.element.appendChild(spinnerMessage);
          this.fetchMenus(spinner, spinnerMessage);
        });
    }
    return this.element;
  }
  static async fetchMenus(spinner: HTMLElement, spinnerMessage: HTMLElement) {
    try {
      const popularMenuItems = (await fetchPopularMenuItems()) as IMenuItem[];
      this.renderMenu(popularMenuItems);
    } catch (error) {
      this.element.innerHTML = `<h3>${error}</h3>`;
    } finally {
      spinner.remove();
      spinnerMessage.remove();
    }
  }
  static renderMenu(popularMenuItems: IMenuItem[]) {
    const menuListContainer = this.element.querySelector(
      '#menu-list',
    ) as HTMLDivElement;
    menuListContainer.innerHTML = '';
    popularMenuItems.forEach((item) => {
      const menuItem = new MenuItem(item, 'large');
      menuListContainer.appendChild(menuItem.element);
    });
  }
}
