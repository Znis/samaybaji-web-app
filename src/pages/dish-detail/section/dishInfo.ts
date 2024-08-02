import { fetchAllMenuItems } from '../../../api-routes/menuItem';
import Rating from '../../../components/rating';
import { Status } from '../../../enums/menuItem';
import { IDish } from '../../../interfaces/dish';
import IMenuItem from '../../../interfaces/menuItem';
import { StateManager } from '../../../state-management/stateManager';
import Cart from '../../cart/cart';

export default class DishInfo {
  static htmlTemplateURL =
    '/assets/templates/pages/dish-detail/section/dish-info.html';
  static element = document.createElement('section');
  static html = '';

  static init(dishDetailData: IDish): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-info');
          this.html = html;
          this.render(dishDetailData);
        });
    }
    return this.element;
  }

  static render(dishDetailData: IDish): void {
    this.element.innerHTML = this.html;
    this.renderRating(4);
    this.renderDishInfoAttribute(dishDetailData.attributes);
    this.renderDishInfoItem(dishDetailData.items);
    this.renderAddToCartButton(dishDetailData.menuItemId);

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
  static async renderAddToCartButton(menuItemId: string) {
    const menuItems = (await fetchAllMenuItems()) as IMenuItem[];
    const menuItemData = menuItems.find(
      (item) => item.id === menuItemId,
    ) as IMenuItem;
    let isAddedToCart = this.checkIfPresentInCart(menuItemData);
    const addToCartButton = this.element.querySelector(
      '#dish-add-to-cart-button',
    ) as HTMLButtonElement;
    addToCartButton.innerText = 'Add to Cart';
    if (menuItemData.status === Status.OUT_OF_STOCK) {
      addToCartButton.classList.add('button--clicked');
      addToCartButton.innerHTML = 'Out of Stock';
      addToCartButton.disabled = true;
    } else {
      addToCartButton.disabled = false;
    }

    if (isAddedToCart) {
      addToCartButton.classList.add('button--clicked');
      addToCartButton.innerHTML =
        'Remove from cart <i class="fas fa-shopping-cart"></i>';
    }
    addToCartButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!isAddedToCart) {
        Cart.addItem(menuItemData);
        this.toggleButton(addToCartButton, isAddedToCart);
        isAddedToCart = true;
      } else {
        Cart.removeItem(menuItemData);
        this.toggleButton(addToCartButton, isAddedToCart);
        isAddedToCart = false;
      }
    });
  }
  static checkIfPresentInCart(menuItemData: IMenuItem) {
    const doesExist = StateManager.state.cart.some(
      (item) => item.menuItemData.id === menuItemData.id,
    );
    return doesExist;
  }

  static toggleButton(button: HTMLButtonElement, isAddedToCart: boolean) {
    button.classList.toggle('button--clicked');
    if (!isAddedToCart) {
      button.innerHTML =
        'Remove from cart <i class="fas fa-shopping-cart"></i>';
    } else {
      button.innerHTML = 'Add to Cart';
    }
  }
}
