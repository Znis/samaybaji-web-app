import RestaurantMenuList from './section/menu';
import RestaurantTitle from './section/title';

export default class RestaurantSectionLayout {
  element: HTMLElement;
  id: string;

  constructor(id: string) {
    this.element = document.createElement('section');
    this.id = id;

    this.render();
  }

  render(): void {
    if (this.element) {
      this.element.classList.add('restaurant');
      this.element.setAttribute('id', this.id);

      const restaurantTitleSection = new RestaurantTitle();
      this.element.appendChild(restaurantTitleSection.element);

      const restaurantMenuSection = new RestaurantMenuList();
      this.element.appendChild(restaurantMenuSection.element);
    }
  }
}
