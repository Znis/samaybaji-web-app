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
import { IUpdateUser } from '../interfaces/users';

export class UserEditForm {
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
        });
    }
    return this.element;
  }
  static innerElements() {
    return {
      formHeading: this.element.querySelector(
        '.modal-form__heading',
      ) as HTMLHeadingElement,
      userEditForm: this.element.querySelector(
        '#user-edit-form',
      ) as HTMLInputElement,
      userFullName: this.element.querySelector(
        '#user-fullname',
      ) as HTMLInputElement,
      email: this.element.querySelector('#email') as HTMLInputElement,
      password: this.element.querySelector(
        '#user-password',
      ) as HTMLInputElement,
      confirmPassword: this.element.querySelector(
        '#user-confirm-password',
      ) as HTMLInputElement,
      phoneNumber: this.element.querySelector(
        '#user-phone-number',
      ) as HTMLInputElement,

      profilePic: this.element.querySelector(
        '#user-profile-image',
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
    this.innerElements().userEditForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        if (!this.innerElements().userEditForm.checkValidity()) {
          this.innerElements().userEditForm.reportValidity();
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

    const data: IUpdateUser = {
      name: this.innerElements().userFullName.value,
      email: this.innerElements().email.value,
      imageSrc: profileImageUploadUrl!.url.fileName,
      phoneNumber: this.innerElements().phoneNumber.value,
      password: this.innerElements().password.value,
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
