import { fetchAllMenus } from '../../api-routes/menu';
import { LoaderSpinner } from '../../components/loaderSpinner';
import RestaurantSectionLayout from './restaurant/restaurantSectionLayout';

export default class MenuPageLayout {
  static element: HTMLElement = document.createElement('div');
  static menus = [];
  static init(): HTMLElement {
    this.element.setAttribute('class', 'menu-page');
    this.element.innerHTML = '';
    const spinner = LoaderSpinner.render(50);
    const spinnerMessage = document.createElement('p');
    spinnerMessage.className = 'spinner-message';
    spinnerMessage.textContent =
      'The Backend Server may take around a minute to boot up. Please wait.';
    this.element.appendChild(spinner);
    this.element.appendChild(spinnerMessage);
    this.fetchMenus(spinner, spinnerMessage);
    return this.element;
  }
  static async fetchMenus(spinner: HTMLElement, spinnerMessage: HTMLElement) {
    try {
      this.menus = await fetchAllMenus();
      this.renderRestaurantsMenu();
    } catch (error) {
      this.element.innerHTML = `<h3>${error}</h3>`;
    } finally {
      spinner.remove();
      spinnerMessage.remove();
    }
  }
  static async renderRestaurantsMenu() {
    this.menus.forEach((menu) => {
      this.element.appendChild(new RestaurantSectionLayout().init(menu));
    });
  }
}
