import axios from 'axios';
import { fetchDishByMenuItemId } from '../../../../api-routes/dish';
import { createMenu, fetchAllMenus } from '../../../../api-routes/menu';
import {
  deleteMenuItem,
  editMenuItem,
  fetchAllMenuItems,
} from '../../../../api-routes/menuItem';
import { makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { LoaderSpinner } from '../../../../components/loaderSpinner';
import { MenuItemForm } from '../../../../components/menuItemForm';
import Modal from '../../../../components/modal';
import Toast from '../../../../components/toast';
import { Status } from '../../../../enums/menuItem';
import { IMenu } from '../../../../interfaces/menu';
import { IMenuItem } from '../../../../interfaces/menuItem';
import { StateManager } from '../../../../state-management/stateManager';

export default class RestaurantMenuDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/menu.html';
  static html = '';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then(async (html) => {
          this.element.classList.add('dashboard');
          this.html = html;
          const spinner = LoaderSpinner.render(50);
          this.element.appendChild(spinner);
          const checkMenu = await this.checkIfMenuIsPresent();
          this.element.removeChild(spinner);

          if (!checkMenu) {
            this.renderDashboard();
          } else {
            this.fetchAllMenuItems();
          }
          this.setEventListeners();
        });
    }
    return this.element;
  }

  static async checkIfMenuIsPresent() {
    const menus = (await fetchAllMenus()) as unknown as IMenu[];
    const ownMenu = menus.find(
      (menu) => menu.restaurantId == StateManager.state.user?.restaurantId,
    );
    if (ownMenu) {
      return true;
    }
    return false;
  }
  static async fetchAllMenuItems() {
    this.element.innerHTML = this.html;
    const menus = (await fetchAllMenus()) as unknown as IMenu[];
    const ownMenu = menus.find(
      (menu) => menu.restaurantId == StateManager.state.user?.restaurantId,
    );
    this.render(ownMenu?.menuItems as unknown as IMenuItem[]);
  }
  static setEventListeners() {
    const addItemButtom = this.element.querySelector(
      '#add-menu-item-button',
    ) as HTMLButtonElement;
    const createMenuForm = this.element.querySelector(
      '#create-menu-form',
    ) as HTMLFormElement;
    const menuNameField = this.element.querySelector(
      '#menu-title',
    ) as HTMLInputElement;
    const descriptionField = this.element.querySelector(
      '#menu-description',
    ) as HTMLInputElement;
    const submitButton = this.element.querySelector(
      '#create-menu-button',
    ) as HTMLButtonElement;
    const errorMessage = this.element.querySelector(
      '.form__error-message',
    ) as HTMLParagraphElement;

    createMenuForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!createMenuForm.checkValidity()) {
        createMenuForm.reportValidity();
      }
      const spinner = LoaderSpinner.render(20);
      try {
        submitButton.appendChild(spinner);
        submitButton.disabled = true;
        await makeApiCall(createMenu, {
          name: menuNameField.value,
          description: descriptionField.value,
        });
        Toast.show('Menu Registration Successful');
        this.init();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorMessage.innerHTML = error.message;
          Toast.show('Menu Registration Failed');
        } else {
          errorMessage.innerHTML = 'An unexpected error occurred';
          Toast.show('An unexpected error occurred');
        }
      } finally {
        spinner.remove();
        submitButton.disabled = false;
      }
    });
    addItemButtom?.addEventListener('click', () => {
      Modal.toggle();
      const modal = document.querySelector('.modal') as HTMLDivElement;
      modal.innerHTML = '';
      modal.appendChild(MenuItemForm.init('create'));
    });
  }
  static renderDashboard() {
    this.element.innerHTML = this.html;
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

  static createAccordionHeader(status: Status, heading: string) {
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
    editMenu.className =
      'fa-solid fa-pen-to-square accordion-header-normal-action-icon';

    editMenu.id = 'edit-menu-item';
    accordionHeader.appendChild(editMenu);
    const switchMenuStatus = document.createElement('i');
    if (status == Status.IN_STOCK) {
      switchMenuStatus.className =
        'fa-solid fa-toggle-on accordion-header-normal-action-icon';
    } else {
      switchMenuStatus.className =
        'fa-solid fa-toggle-off accordion-header-normal-action-icon';
    }

    switchMenuStatus.id = 'switch-menu-item-status';
    accordionHeader.appendChild(switchMenuStatus);

    const deleteMenuItemIcon = document.createElement('i');
    deleteMenuItemIcon.className =
      'fa-solid fa-trash accordion-header-danger-action-icon';
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
  static accordionHeaderEventListener(
    accordionHeader: HTMLDivElement,
    menuItemId: string,
  ) {
    const deleteButton = accordionHeader.querySelector('#delete-menu-item');
    const switchStatus = accordionHeader.querySelector(
      '#switch-menu-item-status',
    );
    const editButton = accordionHeader.querySelector('#edit-menu-item');
    deleteButton!.addEventListener('click', async (event) => {
      event.stopPropagation();
      await RestaurantMenuDashboard.deleteMenuItem(menuItemId);
      RestaurantMenuDashboard.fetchAllMenuItems();
    });
    switchStatus!.addEventListener('click', async (event) => {
      event.stopPropagation();
      await RestaurantMenuDashboard.switchMenuItemStatus(menuItemId);
      RestaurantMenuDashboard.fetchAllMenuItems();
    });
    editButton!.addEventListener('click', async (event) => {
      event.stopPropagation();
      await RestaurantMenuDashboard.editMenuItem(menuItemId);
      RestaurantMenuDashboard.fetchAllMenuItems();
    });
  }
  static async render(menuItems: IMenuItem[]) {
    const inStockMenuItemContainer = this.element.querySelector(
      '#in-stock-menu',
    ) as HTMLElement;
    const outOfStockMenuItemContainer = this.element.querySelector(
      '#out-of-stock-menu',
    ) as HTMLElement;
    inStockMenuItemContainer.innerHTML = '';
    outOfStockMenuItemContainer.innerHTML = '';
    if (!menuItems.length) {
      inStockMenuItemContainer!.innerHTML = `<h3>No active orders</h3>`;
      outOfStockMenuItemContainer!.innerHTML = `<h3>No history orders</h3>`;
    }
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
      const heading = item.name;
      const accordionContentElement =
        await this.renderAccordionContent(menuItemSummary);
      const accordionHeaderElement = this.createAccordionHeader(
        item.status,
        heading,
      );
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
        params: item.id,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);
      if (item.status == Status.IN_STOCK) {
        inStockMenuItemContainer!.appendChild(accordion.element);
      } else {
        outOfStockMenuItemContainer!.appendChild(accordion.element);
      }
    });
  }
  static async editMenuItem(menuItemId: string) {
    const dish = await fetchDishByMenuItemId(menuItemId);
    Modal.toggle();
    document
      .querySelector('.modal')!
      .appendChild(MenuItemForm.init('edit', dish, menuItemId));
  }
  static async switchMenuItemStatus(menuItemId: string) {
    try {
      const menuItems = (await fetchAllMenuItems()) as unknown as IMenuItem[];
      const menuItem = menuItems.find((item) => item.id == menuItemId);
      if (!menuItem) {
        throw new Error('Menu item not found');
      }
      await makeApiCall(
        editMenuItem,
        {
          status:
            menuItem.status == Status.IN_STOCK
              ? Status.OUT_OF_STOCK
              : Status.IN_STOCK,
        },
        menuItemId,
      );
      Toast.show('Status updated successfully');
    } catch (error) {
      Toast.show('An error occurred while switching the status');
    }
  }
  static async deleteMenuItem(menuItemId: string) {
    try {
      await makeApiCall(deleteMenuItem, menuItemId);
      Toast.show('Menu item deleted successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show(error.message);
      } else {
        Toast.show('An unexpected error occurred');
      }
    }
  }
}
