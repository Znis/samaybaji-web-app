import Cart from '../pages/cart/cart';
import DishDetailLayout from '../pages/dish-detail/dishDetailLayout';
import LandingPage from '../pages/landing-page/landingPageLayout';
import MenuPageLayout from '../pages/menu/menuPageLayout';

export default class Content {
  static element: HTMLElement = document.createElement('div');

  static init(): HTMLElement {
    this.element.setAttribute('class', 'content');

    this.element.appendChild(LandingPage.init());
    this.element.appendChild(Cart.init());
    this.element.appendChild(MenuPageLayout.init());
    this.element.appendChild(DishDetailLayout.init());

    return this.element;
  }
}
