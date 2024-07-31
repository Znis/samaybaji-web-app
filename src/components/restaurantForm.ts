import {
  createRestaurant,
  getUploadUrl,
  makeApiCall,
  uploadImage,
} from '../apiCalls';
import { ICreateRestaurant } from '../interfaces/restaurant';
import Modal from './modal';
import { HttpStatusCode } from 'axios';
import { LoaderSpinner } from './loaderSpinner';
import Toast from './toast';

export class RestaurantForm {
  static htmlTemplateURL = '/assets/templates/components/restaurant-form.html';
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
      this.innerElements().formHeading.innerHTML = 'Register Restaurant';
    } else {
      this.innerElements().submitButton.innerHTML = 'Edit';
      this.innerElements().formHeading.innerHTML = 'Edit Restaurant';
    }
  }
  static innerElements() {
    return {
      formHeading: this.element.querySelector(
        '.modal-form__heading',
      ) as HTMLHeadingElement,
      registrationForm: this.element.querySelector(
        '#restaurant-form',
      ) as HTMLInputElement,
      restaurantName: this.element.querySelector(
        '#restaurant-name',
      ) as HTMLInputElement,
      location: this.element.querySelector('#location') as HTMLInputElement,
      contactNumber: this.element.querySelector(
        '#contact-number',
      ) as HTMLInputElement,
      openingTime: this.element.querySelector(
        '#opening-time',
      ) as HTMLInputElement,
      closingTime: this.element.querySelector(
        '#closing-time',
      ) as HTMLInputElement,
      panNumber: this.element.querySelector('#pan-number') as HTMLInputElement,
      profilePic: this.element.querySelector(
        '#profile-image',
      ) as HTMLInputElement,
      coverPic: this.element.querySelector('#cover-image') as HTMLInputElement,
      description: this.element.querySelector(
        '#description',
      ) as HTMLInputElement,
      submitButton: this.element.querySelector(
        '#form-submit-button',
      ) as HTMLButtonElement,
      crossButton: this.element.querySelector(
        '#modal-cross-button',
      ) as HTMLElement,
    };
  }
  static setupEventListeners() {
    this.innerElements().crossButton.addEventListener('click', () =>
      Modal.toggle(),
    );
    this.innerElements().registrationForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        if (!this.innerElements().registrationForm.checkValidity()) {
          this.innerElements().registrationForm.reportValidity();
          return;
        }
        this.submitFormRegistration();
      },
    );
  }
  static async submitFormRegistration() {
    const profileImageUploadUrl = (await makeApiCall(
      getUploadUrl,
    )) as unknown as {
      url: { url: string; fileName: string; bucketName: string };
    };
    const profileImageUploadResponse = await makeApiCall(
      uploadImage,
      profileImageUploadUrl!.url.url,
      this.innerElements().profilePic.files![0],
    );
    const coverImageUploadUrl = (await makeApiCall(
      getUploadUrl,
    )) as unknown as {
      url: { url: string; fileName: string; bucketName: string };
    };
    const coverImageUploadResponse = await makeApiCall(
      uploadImage,
      coverImageUploadUrl!.url.url,
      this.innerElements().coverPic.files![0],
    );

    const openHours = `${this.innerElements().openingTime.value} - ${this.innerElements().closingTime.value}`;
    const data: ICreateRestaurant = {
      name: this.innerElements().restaurantName.value,
      location: this.innerElements().location.value,
      contactNumber: this.innerElements().contactNumber.value,
      openHours: openHours,
      panNumber: this.innerElements().panNumber.value,
      profilePic: profileImageUploadUrl.url.fileName,
      coverPic: coverImageUploadUrl.url.fileName,
      description: this.innerElements().description.value,
    };
    const spinner = LoaderSpinner.render();
    try {
      this.innerElements().submitButton.append(spinner);
      const formSubmissionResponse = await makeApiCall(createRestaurant, data);
      if (formSubmissionResponse!.status === HttpStatusCode.Accepted) {
        Toast.show('Restaurant Registration Submitted');
        Modal.toggle();
      }
    } catch (error) {
      console.log(error);
      Toast.show('Restaurant Registration Failed');
    } finally {
      spinner.remove();
    }
  }

  static isValidImage(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
}
