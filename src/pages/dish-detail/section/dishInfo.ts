import Rating from '../../../components/rating';
import { IDishDetailData } from '../../../interfaces/dishDetail';

export default class DishInfo {
  static htmlTemplateURL =
    '/assets/templates/pages/dish-detail/section/dish-info.html';
  static element = document.createElement('section');

  static init(dishDetailData: IDishDetailData): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-info');
          this.element.innerHTML = html;
          this.render(dishDetailData);
        });
    }
    return this.element;
  }

  static render(dishDetailData: IDishDetailData): void {
    this.renderRating(dishDetailData.rating);
    this.renderDishInfoAttribute(dishDetailData.attributes);
    this.renderDishInfoItem(dishDetailData.items);

    const dishImage = this.element.querySelector('.dish-info__image');
    dishImage!.setAttribute('src', dishDetailData.imgSrc);
    dishImage!.setAttribute('alt', `An image of ${dishDetailData.name}`);

    const dishPriceAmount = this.element.querySelector(
      '.dish-info__price-amount',
    );
    dishPriceAmount!.textContent = `Rs. ${dishDetailData.price}`;
    const dishPortionAmount = this.element.querySelector(
      '.dish-info__portion-amount',
    );
    dishPortionAmount!.textContent = `${dishDetailData.portion}`;
    const dishName = this.element.querySelector('.dish-info__name');
    dishName!.textContent = dishDetailData.name;
    const dishDescription = this.element.querySelector(
      '.dish-info__description',
    );
    dishDescription!.textContent = dishDetailData.description;
  }

  static renderRating(rating: number): void {
    this.element
      .querySelector('.dish-info__rating-wrapper')!
      .appendChild(Rating.init(rating));
  }
  static renderDishInfoAttribute(dishInfoAttributes: string[]): void {
    const attributeWrapper = this.element.querySelector(
      '.dish-info__attributes-wrapper',
    );
    dishInfoAttributes.forEach((attribute) => {
      const attributeDiv = document.createElement('div');
      attributeDiv.className = 'dish-info__attribute';

      const iconElement = document.createElement('i');
      iconElement.className = `fa-solid fa-circle dish-info__attribute-icon`;

      const titleElement = document.createElement('p');
      titleElement.className = 'dish-info__attribute-title';
      titleElement.textContent = attribute;

      attributeDiv.appendChild(iconElement);
      attributeDiv.appendChild(titleElement);

      attributeWrapper!.appendChild(attributeDiv);
    });
  }

  static renderDishInfoItem(dishInfoItems: string[]): void {
    const itemsListWrapper = this.element.querySelector(
      '.dish-info__items-list-wrapper',
    );
    dishInfoItems.forEach((dishItemName) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'dish-info__item';

      const iconElement = document.createElement('i');
      iconElement.className = `fa-solid fa-circle dish-info__item-icon`;

      const titleElement = document.createElement('p');
      titleElement.className = 'dish-info__item-title';
      titleElement.textContent = dishItemName;

      itemDiv.appendChild(iconElement);
      itemDiv.appendChild(titleElement);

      itemsListWrapper!.appendChild(itemDiv);
    });
  }
}
