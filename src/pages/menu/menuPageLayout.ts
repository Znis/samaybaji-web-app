import { fetchAllMenus } from '../../apiCalls';
import { LoaderSpinner } from '../../components/loaderSpinner';
import RestaurantSectionLayout from './restaurant/restaurantSectionLayout';

export default class MenuPageLayout {
  static element: HTMLElement = document.createElement('div');
  static menus = [];
  static init(): HTMLElement {
    this.element.setAttribute('class', 'menu-page');
    this.element.innerHTML = '';
    const spinner = LoaderSpinner.render(50);
    this.element.appendChild(spinner);
    this.fetchMenus(spinner);
    return this.element;
  }
  static async fetchMenus(spinner: HTMLElement) {
    try {
      this.menus = await fetchAllMenus();
      this.renderRestaurantsMenu();
    } catch (error) {
      this.element.innerHTML = `<h3>${error}</h3>`;
    } finally {
      spinner.remove();
    }
  }
  static async renderRestaurantsMenu() {
    this.menus.forEach((menu) => {
      this.element.appendChild(new RestaurantSectionLayout().init(menu));
    });
  }
}
