import { LoaderSpinner } from './loaderSpinner';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import Modal from './modal';
import axios, { HttpStatusCode } from 'axios';
import { userFormData } from '../interfaces/users';
import { StateManagement } from '../state-management/stateManagement';
import Toast from './toast';
import { fetchAllUsers, login, makeApiCall, register } from '../apiCalls';
import Cart from '../pages/cart/cart';
export default class AuthCard {
  static element = document.createElement('div');
  static htmlTemplateURL = './assets/templates/components/auth-card.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('auth-card');
          this.element.innerHTML = html;
          this.setupEventListeners();
        });
    }
    return this.element;
  }

  static setupEventListeners() {
    const signupButton = document.getElementById('signup');
    const signinButton = document.getElementById('signin');
    const crossButtonRight = document.getElementById(
      'auth-card-cross-button-right',
    );
    const crossButtonLeft = document.getElementById(
      'auth-card-cross-button-left',
    );
    const passwordVisibility = document.getElementsByName('toggle-password');
    const activeBox = document.querySelector(
      '.auth-card__active-box',
    ) as HTMLElement;
    const signinForm = this.element.querySelector(
      '.auth-card__form--signin',
    ) as HTMLElement;
    const signupForm = this.element.querySelector(
      '.auth-card__form--signup',
    ) as HTMLElement;

    const emailInput = this.element.querySelector(
      '#login-email',
    ) as HTMLInputElement;
    const passwordInput = this.element.querySelector(
      '#login-password',
    ) as HTMLInputElement;
    const fullNameInput = this.element.querySelector(
      '#register-fullname',
    ) as HTMLInputElement;
    const registerEmailInput = this.element.querySelector(
      '#register-email',
    ) as HTMLInputElement;
    const registerPasswordInput = this.element.querySelector(
      '#register-password',
    ) as HTMLInputElement;
    const confirmPasswordInput = this.element.querySelector(
      '#register-confirm-password',
    ) as HTMLInputElement;
    const phoneNumberInput = this.element.querySelector(
      '#register-phone',
    ) as HTMLInputElement;
    const tcCheckbox = this.element.querySelector(
      '#register-terms-conditions',
    ) as HTMLInputElement;
    const emailError = this.element.querySelector(
      '#login-email-validate-error',
    ) as HTMLDivElement;
    const passwordError = this.element.querySelector(
      '#login-password-validate-error',
    ) as HTMLDivElement;
    const loginResponseMessage = this.element.querySelector(
      '#login-response-message',
    ) as HTMLDivElement;
    const fullNameError = this.element.querySelector(
      '#register-fullname-validate-error',
    ) as HTMLDivElement;
    const registerEmailError = this.element.querySelector(
      '#register-email-validate-error',
    ) as HTMLDivElement;
    const registerPasswordError = this.element.querySelector(
      '#register-password-validate-error',
    ) as HTMLDivElement;
    const confirmPasswordError = this.element.querySelector(
      '#register-confirm-password-validate-error',
    ) as HTMLDivElement;
    const phoneError = this.element.querySelector(
      '#register-phone-validate-error',
    ) as HTMLDivElement;
    const tcCheckboxError = this.element.querySelector(
      '#register-tc-validate-error',
    ) as HTMLDivElement;
    const registerResponseMessage = this.element.querySelector(
      '#register-response-message',
    ) as HTMLDivElement;
    const loginButton = this.element.querySelector(
      '#login-button',
    ) as HTMLButtonElement;
    const registerButton = this.element.querySelector(
      '#register-button',
    ) as HTMLButtonElement;
    if (
      signupButton &&
      signinButton &&
      activeBox &&
      signinForm &&
      signupForm &&
      crossButtonLeft &&
      crossButtonRight &&
      passwordVisibility
    ) {
      signupButton.addEventListener('click', () => {
        activeBox.style.transform = 'translateX(80%)';
        signinForm.classList.add('auth-card__form--hidden');
        signupForm.classList.remove('auth-card__form--hidden');
        crossButtonLeft.style.visibility = 'visible';
        crossButtonRight.style.visibility = 'hidden';
      });

      signinButton.addEventListener('click', () => {
        activeBox.style.transform = 'translateX(0%)';
        signupForm.classList.add('auth-card__form--hidden');
        signinForm.classList.remove('auth-card__form--hidden');
        crossButtonLeft.style.visibility = 'hidden';
        crossButtonRight.style.visibility = 'visible';
      });
      crossButtonLeft.addEventListener('click', () => Modal.toggle());
      crossButtonRight.addEventListener('click', () => Modal.toggle());
      passwordVisibility.forEach((element) => {
        element.addEventListener('click', () =>
          this.togglePasswordVisibility(),
        );
      });
    }

    const input = document.querySelector('#register-phone') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'np',
      onlyCountries: ['np'],
      utilsScript: "'node_modules/intl-tel-input/build/js/utils.js'",
    });

    signupForm.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      this.clearError(fullNameError);
      this.clearError(registerEmailError);
      this.clearError(registerPasswordError);
      this.clearError(confirmPasswordError);
      this.clearError(phoneError);
      this.clearError(registerResponseMessage);

      let isValid = true;

      if (!this.validateFullName(fullNameInput.value)) {
        this.showError(fullNameError, 'Please enter a valid name.');
        isValid = false;
      }

      if (!this.validateEmail(registerEmailInput.value)) {
        this.showError(registerEmailError, 'Please enter a valid email.');
        isValid = false;
      }

      if (!this.validatePassword(registerPasswordInput.value)) {
        this.showError(
          registerPasswordError,
          'Must be at least 4 characters long.',
        );
        isValid = false;
      }
      if (
        !this.validateConfirmPassword(
          passwordInput.value,
          confirmPasswordInput.value,
        )
      ) {
        this.showError(confirmPasswordError, 'Must be at same as the password');
        isValid = false;
      }
      if (!this.validatePhoneNumber(phoneNumberInput.value)) {
        this.showError(phoneError, 'Please enter a valid phone number.');
        isValid = false;
      }

      if (isValid) {
        const formData = {
          name: fullNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          phoneNumber: phoneNumberInput.value,
        };
        const response = await this.register(registerButton, formData);

        if (response.status != HttpStatusCode.Accepted) {
          this.showError(registerResponseMessage, response.message);
        }
      }
    });

    signinForm.addEventListener('submit', async (event: Event) => {
      event.preventDefault();

      this.clearError(emailError);
      this.clearError(passwordError);
      this.clearError(registerResponseMessage);

      let isValid = true;

      const existingSpinner = loginButton.querySelector('.loading-spinner');
      if (existingSpinner) {
        existingSpinner.remove();
      }
      if (!this.validateEmail(emailInput.value)) {
        this.showError(emailError, 'Please enter a valid email.');
        isValid = false;
      }

      if (!this.validatePassword(passwordInput.value)) {
        this.showError(passwordError, 'Must be at least 4 characters long.');
        isValid = false;
      }

      if (isValid) {
        const formData = {
          email: emailInput.value,
          password: passwordInput.value,
        };
        const response = await this.login(loginButton, formData);

        if (response.status != HttpStatusCode.Accepted) {
          this.showError(loginResponseMessage, response.message);
        }
      }
    });
  }

  static togglePasswordVisibility() {
    const passwordVisibility = document.getElementsByName('toggle-password');
    const passwordInput = document.getElementsByName('password-field');
    if (!passwordVisibility.length || !passwordInput.length) return;

    const type = passwordVisibility[0].classList.contains('fa-eye-slash')
      ? 'password'
      : 'text';

    passwordInput.forEach((element) => {
      element.setAttribute('type', type);
    });

    if (type === 'password') {
      passwordVisibility.forEach((element) => {
        element.classList.remove('fa-eye-slash');
        element.classList.add('fa-eye');
      });
    } else {
      passwordVisibility.forEach((element) => {
        element.classList.remove('fa-eye');
        element.classList.add('fa-eye-slash');
      });
    }
  }

  static validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= 4;
  }
  static validateFullName(fullName: string): boolean {
    const nameRegex = /^[a-zA-Z]{4,}$/;
    return nameRegex.test(fullName);
  }
  static validateConfirmPassword(
    password: string,
    confirmPassword: string,
  ): boolean {
    return confirmPassword === password;
  }
  static validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?\d{10,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  static showError(element: HTMLDivElement, message: string) {
    element.textContent = message;
  }

  static clearError(element: HTMLDivElement) {
    element.textContent = '';
  }

  static async login(
    formSubmissionButton: HTMLButtonElement,
    formData: userFormData,
  ) {
    const spinner = LoaderSpinner.render();
    formSubmissionButton.innerText = 'Logging In';
    formSubmissionButton.classList.add('auth-card__button--loading');
    formSubmissionButton.appendChild(spinner);

    formSubmissionButton.disabled = true;
    return await login(formData)
      .then((data) => {
        Modal.toggle();
        StateManagement.updateState('accessToken', data.accessToken);
        StateManagement.updateState('user', data.user);
        Toast.show('User Logged In');
        Cart.fetchCartItems();
        return data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        formSubmissionButton.disabled = false;
        formSubmissionButton.innerText = 'Login';

        spinner.remove();
        formSubmissionButton.classList.remove('auth-card__button--loading');
      });
  }
  static async register(
    formSubmissionButton: HTMLButtonElement,
    formData: userFormData,
  ) {
    const spinner = LoaderSpinner.render();

    formSubmissionButton.innerText = 'Signing Up';

    formSubmissionButton.classList.add('auth-card__button--loading');
    formSubmissionButton.appendChild(spinner);

    formSubmissionButton.disabled = true;

    return await register(formData)
      .then((data) => {
        Modal.toggle();
        Toast.show('User Logged In');
        return data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        formSubmissionButton.disabled = false;

        formSubmissionButton.innerText = 'Register';
        spinner.remove();
        formSubmissionButton.classList.remove('auth-card__button--loading');
      });
  }
}
