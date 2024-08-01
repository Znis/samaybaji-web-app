import Modal from './modal';
import { HttpStatusCode } from 'axios';
import { LoaderSpinner } from './loaderSpinner';
import Toast from './toast';
import IMenuItem, { ICreateMenuItem } from '../interfaces/menuItem';
import { ICreateDish } from '../interfaces/dish';
import { getUploadUrl, makeApiCall, uploadImage } from '../apiCalls';
import { createRestaurant } from '../api-routes/restaurant';
import { createMenuItem } from '../api-routes/menuItem';
import { createDish } from '../api-routes/dish';

export class MenuItemForm {
  static htmlTemplateURL = '/assets/templates/components/menu-item-form.html';
  static element = document.createElement('div');

  static init(type: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then(async (html) => {
          this.element.classList.add('modal-form');
          this.element.innerHTML = html;
          this.innerElements();
          this.setupEventListeners();
          this.render(type);
        });
    }
    return this.element;
  }
  static render(type: string) {
    if (type === 'create') {
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

    const menuItemData: ICreateMenuItem = {
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
    const dishData: ICreateDish = {
      name: this.innerElements().menuItemName.value,
      portion: this.innerElements().menuItemPortion.value,
      price: parseInt(this.innerElements().menuItemPrice.value),
      imgSrc: imageUploadUrl!.url.fileName,
      description: this.innerElements().dishDescription.value,
      attributes: attributesList,
      items: itemsList,
      menuItemId: '',
      restaurantId: '',
      menuId: '',
    };
    const spinner = LoaderSpinner.render();
    try {
      this.innerElements().submitButton.append(spinner);
      const menuItemCreationResponse = await makeApiCall(
        createMenuItem,
        menuItemData,
      );
      if (menuItemCreationResponse!.status !== HttpStatusCode.Accepted) {
        Toast.show('Menu Item Creation Failed');
        Modal.toggle();
        return;
      }
      const menuItemId = (menuItemCreationResponse! as unknown as IMenuItem).id;
      const dishCreationResponse = await makeApiCall(
        createDish,
        dishData,
        menuItemId,
      );

      if (dishCreationResponse!.status !== HttpStatusCode.Accepted) {
        Toast.show('Dish Creation Failed');
        Modal.toggle();
        return;
      }
      Toast.show('Menu Item and Dish Creation Successsful');
      Modal.toggle();
    } catch (error) {
      console.log(error);
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
