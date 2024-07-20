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

      const titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container');
      titleContainer.appendChild(RestaurantTitle.render());
      this.element.appendChild(titleContainer);

      const menuListContainer = document.createElement('div');
      menuListContainer.classList.add('menu-list-container');
      menuListContainer.appendChild(RestaurantMenuList.render());
      this.element.appendChild(menuListContainer);
    }
  }
}
