import Cart from '../pages/cart/cart';
import DishDetailLayout from '../pages/dish-detail/dishDetailLayout';
import LandingPage from '../pages/landing-page/landingPageLayout';
import MenuPageLayout from '../pages/menu/menuPageLayout';

export default class Content {
  static element: HTMLElement = document.createElement('div');

  static render(): HTMLElement {
    this.element.setAttribute('id', 'content');

    // this.element.appendChild(LandingPage.render());
    // this.element.appendChild(Cart.render());
    // this.element.appendChild(MenuPageLayout.render());
    this.element.appendChild(DishDetailLayout.render());

    return this.element;
  }
}
