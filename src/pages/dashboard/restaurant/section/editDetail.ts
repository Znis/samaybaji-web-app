import { makeApiCall } from '../../../../apiCalls';
import { navigate } from '../../../../router';
import Toast from '../../../../components/toast';
import { deleteMenu, editMenu } from '../../../../api-routes/menu';
import { IEditMenu } from '../../../../interfaces/menu';
import axios from 'axios';
import { LoaderSpinner } from '../../../../components/loaderSpinner';

export default class EditCustomerDetailsDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateUrl =
    '/assets/templates/pages/customer-dashboard/section/edit-detail.html';

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateUrl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          this.render();
          this.setEventListeners();
        });
    }
    return this.element;
  }

  static get innerElements() {
    return {
      userEditDetailsForm: this.element.querySelector(
        '#user-edit-details',
      ) as HTMLFormElement,
      restaurantEditDetailsForm: this.element.querySelector(
        '#restaurant-edit-details',
      ) as HTMLFormElement,
      restaurantName: this.element.querySelector(
        '#restaurant-name',
      ) as HTMLInputElement,
      restaurantDescription: this.element.querySelector(
        '#restaurant-description',
      ) as HTMLTextAreaElement,
      deleteProfileButton: this.element.querySelector(
        '#delete-profile-button',
      ) as HTMLButtonElement,
      errorMessage: this.element.querySelector(
        'menu-edit-error',
      ) as HTMLParagraphElement,
      editMenuButton: this.element.querySelector(
        '#edit-menu-button',
      ) as HTMLButtonElement,
    };
  }

  static render() {
    this.innerElements.userEditDetailsForm.style.display = 'none';
  }

  static setEventListeners() {
    this.innerElements.restaurantEditDetailsForm.addEventListener(
      'submit',
      (event) => this.handleFormSubmit(event),
    );
    this.innerElements.deleteProfileButton.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.deleteProfile();
      },
    );
  }

  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    if (!this.innerElements.restaurantEditDetailsForm.checkValidity()) {
      this.innerElements.restaurantEditDetailsForm.reportValidity();
      return;
    }

    const formData = new FormData(this.innerElements.restaurantEditDetailsForm);
    await this.submitEditForm(formData);
  }

  static showErrorMessage(message: string) {
    if (this.innerElements.errorMessage.textContent !== message) {
      this.innerElements.errorMessage.textContent = message;
    }
  }

  static clearErrorMessage() {
    if (this.innerElements.errorMessage.textContent) {
      this.innerElements.errorMessage.textContent = '';
    }
  }

  static async submitEditForm(formData: FormData) {
    const spinner = LoaderSpinner.render(20);
    try {
      this.innerElements.editMenuButton.appendChild(spinner);
      this.innerElements.editMenuButton.disabled = true;
      const editMenuData: IEditMenu = {
        name: formData.get('menu-title') as string,
        description: formData.get('menu-description') as string,
      };
      const response = await makeApiCall(editMenu, editMenuData);
      if (response) {
        history.pushState(null, '', '/');
        navigate('/');
        Toast.show('Menu updated successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.showErrorMessage(error.message);
        Toast.show('Restaurant Registration Failed');
      } else {
        Toast.show('An error occurred while submitting the form');
        this.showErrorMessage('An error occurred while submitting the form.');
      }
    } finally {
      this.innerElements.editMenuButton.removeChild(spinner);
      this.innerElements.editMenuButton.disabled = false;
    }
  }
  static async deleteProfile() {
    const spinner = LoaderSpinner.render(20);
    try {
      this.innerElements.deleteProfileButton.appendChild(spinner);
      this.innerElements.deleteProfileButton.disabled = true;
      await makeApiCall(deleteMenu);
      history.pushState(null, '', '/');
      navigate('/');
      Toast.show('Menu deleted successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.showErrorMessage(error.message);
        Toast.show('Restaurant Registration Failed');
      } else {
        this.showErrorMessage('An error occurred while deleting the menu.');
        Toast.show('An unexpected error occurred');
      }
    } finally {
      this.innerElements.deleteProfileButton.removeChild(spinner);
      this.innerElements.deleteProfileButton.disabled = false;
    }
  }
}
