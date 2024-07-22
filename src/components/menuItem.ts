import Cart from '../pages/cart/cart';
import { navigate } from '../router';

export default class MenuItem {
  id: string;
  itemName: string;
  imgSrc: string;
  portion: string;
  price: number;
  isPopular: boolean;
  element: HTMLDivElement;
  className: string;
  type: string | undefined;
  isAddedToCart: boolean;
  button: HTMLButtonElement;

  constructor(
    id: string,
    itemName: string,
    imgSrc: string,
    portion: string,
    price: number,
    isPopular: boolean,
    type?: string | undefined,
  ) {
    this.id = id;
    this.itemName = itemName;
    this.imgSrc = imgSrc;
    this.portion = portion;
    this.price = price;
    this.isPopular = isPopular;
    this.type = type;
    this.className = 'menu-item-card';
    this.isAddedToCart = this.checkIfPresentInCart();
    this.button = document.createElement('button');

    this.element = document.createElement('div');
    this.init();
  }

  init(): void {
    if (this.isPopular) {
      const ribbon = this.createIsPopularRibbon();
      this.element.appendChild(ribbon);
    }
    this.createItemCard();
  }

  createItemCard(): void {
    this.element.classList.add(this.className);
    this.type ? this.element.classList.add(`${this.className}--large`) : '';

    this.element.setAttribute('id', this.id);

    const img = document.createElement('img');
    img.src = this.imgSrc;
    img.alt = `An image of ${this.itemName}`;

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-wrapper');

    const h3 = document.createElement('h3');
    h3.innerText = this.itemName;

    const portionDiv = document.createElement('div');
    portionDiv.classList.add('portion');
    portionDiv.innerText = this.portion;

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerText = `Rs. ${this.price}`;

    this.button.classList.add('button');
    this.button.name = 'addtocartbutton';
    this.button.innerText = 'Add to Cart';

    if (this.isAddedToCart) {
      this.button.classList.add('button--clicked');
      this.button.innerHTML =
        'Remove from cart <i class="fas fa-shopping-cart"></i>';
    }
    this.button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!this.isAddedToCart) {
        Cart.addItem(this);
        this.toggleButton();
        this.isAddedToCart = true;
      } else {
        Cart.removeItem(this);
        this.isAddedToCart = false;
      }
    });

    this.element.appendChild(img);
    infoWrapper.appendChild(h3);
    infoWrapper.appendChild(portionDiv);
    infoWrapper.appendChild(priceDiv);
    this.element.appendChild(infoWrapper);
    this.element.appendChild(this.button);

    this.element.addEventListener('click', () => {
      history.pushState(null, '', '/dishdetail/1');
      navigate('/dishdetail/1');
      window.scrollTo(0, 0);
    });
  }

  createIsPopularRibbon(): HTMLElement {
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon', 'ribbon-top-left');
    const span = document.createElement('span');
    span.innerText = 'popular';
    ribbon.appendChild(span);

    return ribbon;
  }

  checkIfPresentInCart() {
    const doesExist = Cart.cartList.some(
      (item) => item.menuItem.id === this.id,
    );
    return doesExist;
  }
  toggleButton() {
    this.button.classList.toggle('button--clicked');
    if (!this.isAddedToCart) {
      this.button.innerHTML =
        'Remove from cart <i class="fas fa-shopping-cart"></i>';
    } else {
      this.button.innerHTML = 'Add to Cart';
    }
  }
}
