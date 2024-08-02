import { HttpStatusCode } from 'axios';
import { deleteUser, editUser } from '../../../../api-routes/users';
import { makeApiCall } from '../../../../apiCalls';
import { navigate } from '../../../../router';
import { StateManager } from '../../../../state-management/stateManager';
import Toast from '../../../../components/toast';

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
      userFullName: this.element.querySelector(
        '#user-fullname',
      ) as HTMLInputElement,
      userPassword: this.element.querySelector(
        '#user-password',
      ) as HTMLInputElement,
      userConfirmPassword: this.element.querySelector(
        '#user-confirm-password',
      ) as HTMLInputElement,
      deleteProfileButton: this.element.querySelector(
        '#delete-profile-button',
      ) as HTMLButtonElement,
      errorMessage: this.element.querySelector(
        '.form__error-message',
      ) as HTMLParagraphElement,
    };
  }

  static render() {
    this.innerElements.restaurantEditDetailsForm.style.display = 'none';
  }

  static setEventListeners() {
    this.innerElements.userEditDetailsForm.addEventListener('submit', (event) =>
      this.handleFormSubmit(event),
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
    if (!this.innerElements.userEditDetailsForm.checkValidity()) {
      this.innerElements.userEditDetailsForm.reportValidity();
      return;
    }

    const formData = new FormData(this.innerElements.userEditDetailsForm);
    if (!this.validateForm(formData)) return;
    await this.submitEditForm(formData);
  }

  static validateForm(formData: FormData): boolean {
    const password = formData.get('user-password')?.toString() || '';
    const confirmPassword =
      formData.get('user-confirm-password')?.toString() || '';
    if (password !== confirmPassword) {
      this.showErrorMessage('Passwords do not match');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/;
    if (!passwordRegex.test(password)) {
      this.showErrorMessage(
        'Password must be at least 4 characters long and contain at least one uppercase letter and one special character',
      );
      return false;
    }

    this.clearErrorMessage();
    return true;
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
    try {
      const editUserData = {
        name: formData.get('user-fullname') as string,
        password: formData.get('user-password') as string,
      };
      const response = await makeApiCall(editUser, editUserData);
      if (response) {
        history.pushState(null, '', '/');
        navigate('/');
        StateManager.resetState();
        Toast.show('Profile updated successfully');
        Toast.show('Logged out');
      }
    } catch (error) {
      Toast.show('An error occurred while submitting the form');
      console.error('Failed to submit edit form:', error);
      this.showErrorMessage('An error occurred while submitting the form.');
    }
  }
  static async deleteProfile() {
    try {
      await makeApiCall(deleteUser);
      history.pushState(null, '', '/');
      navigate('/');
      StateManager.resetState();
      Toast.show('Profile deleted successfully');
      Toast.show('Logged out');
    } catch (error) {
      Toast.show('An error occurred while trying to delete the profile');
      console.error('Failed to submit edit form:', error);
      this.showErrorMessage('An error occurred while submitting the form.');
    }
  }
}
