export default class MenuItem {
  id: string;
  itemName: string;
  imgSrc: string;
  quantity: number;
  price: number;
  isPopular: boolean;
  element: HTMLDivElement;
  className: string;
  type: string | undefined;

  constructor(
    id: string,
    itemName: string,
    imgSrc: string,
    quantity: number,
    price: number,
    isPopular: boolean,
    type?: string | undefined,
  ) {
    this.id = id;
    this.itemName = itemName;
    this.imgSrc = imgSrc;
    this.quantity = quantity;
    this.price = price;
    this.isPopular = isPopular;
    this.type = type;
    this.className = 'menu-item-card';

    this.element = document.createElement('div');
    this.render();
  }

  render(): void {
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
    img.alt = this.itemName;

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-wrapper');

    const h3 = document.createElement('h3');
    h3.innerText = this.itemName;

    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('quantity');
    quantityDiv.innerText = `${this.quantity} Plate`;

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerText = `Rs. ${this.price}`;

    const button = document.createElement('button');
    button.classList.add('button');
    button.name = 'addtocartbutton';
    button.innerText = 'Add to Cart';

    this.element.appendChild(img);
    infoWrapper.appendChild(h3);
    infoWrapper.appendChild(quantityDiv);
    infoWrapper.appendChild(priceDiv);
    this.element.appendChild(infoWrapper);
    this.element.appendChild(button);
  }

  createIsPopularRibbon(): HTMLElement {
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon', 'ribbon-top-left');
    const span = document.createElement('span');
    span.innerText = 'popular';
    ribbon.appendChild(span);

    return ribbon;
  }
}
