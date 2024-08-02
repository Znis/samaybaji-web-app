import Modal from './modal';
import { HttpStatusCode } from 'axios';
import { LoaderSpinner } from './loaderSpinner';
import Toast from './toast';
import IMenuItem, { ICreateMenuItem } from '../interfaces/menuItem';
import { ICreateDish, IDish } from '../interfaces/dish';
import { getUploadUrl, makeApiCall, uploadImage } from '../apiCalls';
import { createRestaurant } from '../api-routes/restaurant';
import { createMenuItem, editMenuItem } from '../api-routes/menuItem';
import { createDish, editDish } from '../api-routes/dish';
import { StateManager } from '../state-management/stateManager';

export class MenuItemForm {
  static htmlTemplateURL = '/assets/templates/components/menu-item-form.html';
  static element = document.createElement('div');
  static type: string;
  static menuItemId: string;
  static dishId: string;

  static init(
    type: string,
    dishDetail?: IDish,
    menuItemId?: string,
  ): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then(async (html) => {
          this.element.classList.add('modal-form');
          this.element.innerHTML = html;
          this.innerElements();
          this.type = type;
          if (dishDetail) {
            this.prefillForm(dishDetail);
            this.dishId = dishDetail.id;
          }
          if (menuItemId) this.menuItemId = menuItemId;
          this.setupEventListeners();
          this.render();
        });
    }
    return this.element;
  }
  static render() {
    if (this.type === 'create') {
      this.innerElements().submitButton.innerHTML = 'Register';
      this.innerElements().menuItemHeading.innerHTML = 'Register Menu Item';
      this.innerElements().dishHeading.innerHTML = 'Dish Details';
    } else {
      this.innerElements().submitButton.innerHTML = 'Edit';
      this.innerElements().menuItemHeading.innerHTML = 'Edit Menu Item';
      this.innerElements().dishHeading.innerHTML = 'Dish Details';
    }
  }
  static innerElements() {
    return {
      menuItemHeading: this.element.querySelector(
        '#menu-item-creation-heading',
      ) as HTMLHeadingElement,
      mainform: this.element.querySelector('#main-form') as HTMLInputElement,
      menuItemName: this.element.querySelector(
        '#menu-item-name',
      ) as HTMLInputElement,
      menuItemPortion: this.element.querySelector(
        '#menu-item-portion',
      ) as HTMLInputElement,
      menuItemPrice: this.element.querySelector(
        '#menu-item-price',
      ) as HTMLInputElement,
      menuItemImage: this.element.querySelector(
        '#menu-item-image',
      ) as HTMLInputElement,
      isPopular: this.element.querySelector(
        '#menu-is-popular',
      ) as HTMLInputElement,
      crossButton: this.element.querySelector(
        '#modal-cross-button',
      ) as HTMLElement,
      submitButton: this.element.querySelector(
        '#form-submit-button',
      ) as HTMLButtonElement,
      dishHeading: this.element.querySelector(
        '#dish-creation-heading',
      ) as HTMLHeadingElement,
      dishAttributes: this.element.querySelector(
        '#dish-attributes',
      ) as HTMLInputElement,
      dishItems: this.element.querySelector('#dish-items') as HTMLInputElement,
      dishDescription: this.element.querySelector(
        '#dish-description',
      ) as HTMLTextAreaElement,
    };
  }
  static prefillForm(dishDetail: IDish) {
    this.innerElements().menuItemName.value = dishDetail.name;
    this.innerElements().menuItemPortion.value = dishDetail.portion;
    this.innerElements().menuItemPrice.value = dishDetail.price.toString();
    this.innerElements().dishDescription.value = dishDetail.description;
    this.innerElements().dishAttributes.value =
      dishDetail.attributes.toString();
    this.innerElements().dishItems.value = dishDetail.items.toString();
  }
  static setupEventListeners() {
    this.innerElements().crossButton.addEventListener('click', () =>
      Modal.toggle(),
    );
    this.innerElements().mainform.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!this.innerElements().mainform.checkValidity()) {
        this.innerElements().mainform.reportValidity();
        return;
      }
      this.submitForm();
    });
  }
  static async submitForm() {
    const imageUploadUrl = (await makeApiCall(getUploadUrl)) as unknown as {
      url: { url: string; fileName: string; bucketName: string };
    };
    const imageUploadResponse = await makeApiCall(
      uploadImage,
      imageUploadUrl!.url.url,
      this.innerElements().menuItemImage.files![0],
    );
    const menuItemData = {
      name: this.innerElements().menuItemName.value,
      portion: this.innerElements().menuItemPortion.value,
      price: parseInt(this.innerElements().menuItemPrice.value),
      imageSrc: imageUploadUrl!.url.fileName,
      isPopular: this.innerElements().isPopular.checked,
    };

    const itemsList = this.innerElements()
      .dishItems.value.split(',')
      .map((item) => item.trim());
    const attributesList = this.innerElements()
      .dishAttributes.value.split(',')
      .map((item) => item.trim());

    const spinner = LoaderSpinner.render();
    try {
      this.innerElements().submitButton.append(spinner);

      let menuItemApiResponse;
      let dishData;
      if (this.type === 'create') {
        menuItemApiResponse = (await makeApiCall(
          createMenuItem,
          menuItemData,
        )) as unknown as { created: IMenuItem };
        dishData = {
          name: this.innerElements().menuItemName.value,
          portion: this.innerElements().menuItemPortion.value,
          price: parseInt(this.innerElements().menuItemPrice.value),
          imgSrc: imageUploadUrl!.url.fileName,
          description: this.innerElements().dishDescription.value,
          attributes: attributesList,
          items: itemsList,
          menuItemId: menuItemApiResponse.created.id,
          restaurantId: StateManager.state.user?.restaurantId as string,
          menuId: menuItemApiResponse.created.menuId,
        };
        await makeApiCall(createDish, dishData, menuItemApiResponse.created.id);
      } else {
        menuItemApiResponse = await makeApiCall(
          editMenuItem,
          menuItemData,
          this.menuItemId,
        );
        dishData = {
          name: this.innerElements().menuItemName.value,
          portion: this.innerElements().menuItemPortion.value,
          price: parseInt(this.innerElements().menuItemPrice.value),
          imgSrc: imageUploadUrl!.url.fileName,
          description: this.innerElements().dishDescription.value,
          attributes: attributesList,
          items: itemsList,
        };
        await makeApiCall(editDish, dishData, this.dishId);
      }

      Modal.toggle();
      Toast.show('Menu Item and Dish Creation Successsful');
    } catch (error) {
      console.log(error);
      Modal.toggle();
      Toast.show('Menu Item Creation Failed');
    } finally {
      spinner.remove();
    }
  }

  static isValidImage(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
}
