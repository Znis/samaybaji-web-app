import { fetchAllMenuItems } from '../../../../api-routes/menuItem';
import { makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { MenuItemForm } from '../../../../components/menuItemForm';
import Modal from '../../../../components/modal';
import { IMenuItem } from '../../../../interfaces/menuItem';

export default class RestaurantMenuDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/menu.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          const check = true;
          if (!check) {
            this.renderDashboard();
          } else {
            this.fetchAllMenuItems();
          }
          this.setEventListeners();
        });
    }
    return this.element;
  }
  static setEventListeners() {
    const addItemButtom = this.element.querySelector('#add-menu-item-button');
    addItemButtom?.addEventListener('click', () => {
      Modal.toggle();
      const modal = document.querySelector('.modal') as HTMLDivElement;
      modal.innerHTML = '';
      modal.appendChild(MenuItemForm.init('create'));
    });
  }
  static renderDashboard() {
    const createMenuContainer = this.element.querySelector(
      '#create-menu-container',
    ) as HTMLDivElement;
    createMenuContainer.style.display = 'flex';
    const addMenuItemsContainer = this.element.querySelector(
      '#add-item-container',
    ) as HTMLDivElement;
    addMenuItemsContainer.style.display = 'none';

    const inStockMenuContainer = this.element.querySelector(
      '#in-stock-menu-container',
    ) as HTMLDivElement;
    inStockMenuContainer.style.display = 'none';

    const outOfStockMenuContainer = this.element.querySelector(
      '#out-of-stock-menu-container',
    ) as HTMLDivElement;
    outOfStockMenuContainer.style.display = 'none';
  }
  static async fetchAllMenuItems() {
    const menuItems = await makeApiCall(fetchAllMenuItems);
    console.log(menuItems);
    this.render(menuItems as unknown as IMenuItem[]);
  }
  static createAccordionHeader(heading: string) {
    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';

    const accordionTitleWrapper = document.createElement('div');
    accordionTitleWrapper.className = 'accordion-title-wrapper';

    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-circle-check accordion-header-icon';
    accordionTitleWrapper.appendChild(checkIcon);

    const accordionTitle = document.createElement('p');
    accordionTitle.className = 'accordion-title';
    accordionTitle.innerText = heading;
    accordionTitleWrapper.appendChild(accordionTitle);

    accordionHeader.appendChild(accordionTitleWrapper);
    const editMenu = document.createElement('i');
    editMenu.className = 'fa-solid fa-angle-down accordion-header-action-icon';

    editMenu.id = 'edit-menu-item';
    accordionHeader.appendChild(editMenu);
    const switchMenuStatus = document.createElement('i');
    switchMenuStatus.className =
      'fa-solid fa-angle-down accordion-header-action-icon';

    switchMenuStatus.id = 'switch-menu-item-status';
    accordionHeader.appendChild(switchMenuStatus);

    const deleteMenuItemIcon = document.createElement('i');
    deleteMenuItemIcon.className =
      'fa-solid fa-check accordion-header-action-icon';
    deleteMenuItemIcon.id = 'delete-menu-item';
    accordionHeader.appendChild(deleteMenuItemIcon);

    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');
    iconWrapper.appendChild(switchMenuStatus);
    iconWrapper.appendChild(editMenu);
    iconWrapper.appendChild(deleteMenuItemIcon);
    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(iconWrapper);
    return accordionHeader;
  }

  static async initialiseAccordionContent() {
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    const templateUrl =
      '/assets/templates/components/menu-accordion-content.html';

    await fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        accordionContent.innerHTML = html;
      });
    return accordionContent;
  }
  static async renderAccordionContent(menuItem: { [key: string]: string }) {
    const accordionContent = await this.initialiseAccordionContent();
    const menuItemImage = accordionContent.querySelector(
      '#menu-item-image',
    ) as HTMLImageElement;
    menuItemImage.setAttribute('src', menuItem.image || '');
    const menuItemName = accordionContent.querySelector(
      '#menu-item-name',
    ) as HTMLSpanElement;
    menuItemName.innerHTML = `${menuItem.name || ''}`;
    const menuItemPortion = accordionContent.querySelector(
      '#menu-item-portion',
    ) as HTMLSpanElement;
    menuItemPortion.innerHTML = `${menuItem.portion || ''}`;
    const menuItemPrice = accordionContent.querySelector(
      '#menu-item-price',
    ) as HTMLSpanElement;
    menuItemPrice.innerHTML = `${menuItem.price || ''}`;

    return accordionContent;
  }
  static accordionHeaderEventListener(accordionHeader: HTMLDivElement) {
    const deleteButton = accordionHeader.querySelector('#delete-menu-item');
    const switchStatus = accordionHeader.querySelector(
      '#switch-menu-item-status',
    );
    const editButton = accordionHeader.querySelector('#edit-menu-item');
    deleteButton!.addEventListener('click', () => {
      console.log('delete-menu-item');
    });
    switchStatus!.addEventListener('click', () => {
      console.log('switch-menu-item-status');
    });
    editButton!.addEventListener('click', () => {
      console.log('edit-menu-item');
    });
  }
  static async render(menuItems: IMenuItem[]) {
    const createMenuContainer = this.element.querySelector(
      '#create-menu-container',
    ) as HTMLDivElement;
    createMenuContainer.style.display = 'none';
    menuItems.forEach(async (item) => {
      const menuItemSummary = {
        image: item.imageSrc,
        name: item.name,
        portion: item.portion,
        price: item.price.toString(),
        isPopular: item.isPopular ? 'Yes' : 'No',
      };
      console.log(menuItemSummary);
      const heading = item.name;
      const accordionContentElement =
        await this.renderAccordionContent(menuItemSummary);
      const accordionHeaderElement = this.createAccordionHeader(heading);
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);

      const inStockMenuItemContainer =
        this.element.querySelector('#in-stock-menu');
      const outOfStockMenuItemContainer =
        this.element.querySelector('#out-of-stock-menu');
      inStockMenuItemContainer!.appendChild(accordion.element);
      outOfStockMenuItemContainer!.appendChild(accordion.element);
    });
  }
}
