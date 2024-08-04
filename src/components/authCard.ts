import { LoaderSpinner } from './loaderSpinner';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import Modal from './modal';
import { HttpStatusCode } from 'axios';
import { IAuthUser, ICreateUser } from '../interfaces/users';
import { StateManager } from '../state-management/stateManager';
import Toast from './toast';
import Cart from '../pages/cart/cart';
import { login } from '../api-routes/auth';
import { register } from '../api-routes/users';
import { navigate } from '../router';
export default class AuthCard {
  static element = document.createElement('div');
  static htmlTemplateURL = '/assets/templates/components/auth-card.html';
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

  static get innerElements() {
    return {
      signupButton: document.getElementById('signup') as HTMLElement,
      signinButton: document.getElementById('signin') as HTMLElement,
      crossButtonRight: document.getElementById(
        'auth-card-cross-button-right',
      ) as HTMLElement,
      crossButtonLeft: document.getElementById(
        'auth-card-cross-button-left',
      ) as HTMLElement,
      passwordVisibility: document.getElementsByName(
        'toggle-password',
      ) as NodeListOf<HTMLElement>,
      activeBox: document.querySelector(
        '.auth-card__active-box',
      ) as HTMLElement,
      signinForm: this.element.querySelector(
        '.auth-card__form--signin',
      ) as HTMLFormElement,
      signupForm: this.element.querySelector(
        '.auth-card__form--signup',
      ) as HTMLFormElement,
      emailInput: this.element.querySelector(
        '#login-email',
      ) as HTMLInputElement,
      passwordInput: this.element.querySelector(
        '#login-password',
      ) as HTMLInputElement,
      fullNameInput: this.element.querySelector(
        '#register-fullname',
      ) as HTMLInputElement,
      registerEmailInput: this.element.querySelector(
        '#register-email',
      ) as HTMLInputElement,
      registerPasswordInput: this.element.querySelector(
        '#register-password',
      ) as HTMLInputElement,
      confirmPasswordInput: this.element.querySelector(
        '#register-confirm-password',
      ) as HTMLInputElement,
      phoneNumberInput: this.element.querySelector(
        '#register-phone',
      ) as HTMLInputElement,
      emailError: this.element.querySelector(
        '#login-email-validate-error',
      ) as HTMLDivElement,
      passwordError: this.element.querySelector(
        '#login-password-validate-error',
      ) as HTMLDivElement,
      loginResponseMessage: this.element.querySelector(
        '#login-response-message',
      ) as HTMLDivElement,
      fullNameError: this.element.querySelector(
        '#register-fullname-validate-error',
      ) as HTMLDivElement,
      registerEmailError: this.element.querySelector(
        '#register-email-validate-error',
      ) as HTMLDivElement,
      registerPasswordError: this.element.querySelector(
        '#register-password-validate-error',
      ) as HTMLDivElement,
      confirmPasswordError: this.element.querySelector(
        '#register-confirm-password-validate-error',
      ) as HTMLDivElement,
      phoneError: this.element.querySelector(
        '#register-phone-validate-error',
      ) as HTMLDivElement,
      registerResponseMessage: this.element.querySelector(
        '#register-response-message',
      ) as HTMLDivElement,
      loginButton: this.element.querySelector(
        '#login-button',
      ) as HTMLButtonElement,
      registerButton: this.element.querySelector(
        '#register-button',
      ) as HTMLButtonElement,
    };
  }
  static setupEventListeners() {
    this.innerElements.signupButton.addEventListener('click', () => {
      this.innerElements.activeBox.style.transform = 'translateX(80%)';
      this.innerElements.signinForm.classList.add('auth-card__form--hidden');
      this.innerElements.signupForm.classList.remove('auth-card__form--hidden');
      this.innerElements.crossButtonLeft.style.visibility = 'visible';
      this.innerElements.crossButtonRight.style.visibility = 'hidden';
    });

    this.innerElements.signinButton.addEventListener('click', () => {
      this.innerElements.activeBox.style.transform = 'translateX(0%)';
      this.innerElements.signupForm.classList.add('auth-card__form--hidden');
      this.innerElements.signinForm.classList.remove('auth-card__form--hidden');
      this.innerElements.crossButtonLeft.style.visibility = 'hidden';
      this.innerElements.crossButtonRight.style.visibility = 'visible';
    });
    this.innerElements.crossButtonLeft.addEventListener('click', () =>
      Modal.toggle(),
    );
    this.innerElements.crossButtonRight.addEventListener('click', () =>
      Modal.toggle(),
    );
    this.innerElements.passwordVisibility.forEach((element) => {
      element.addEventListener('click', () => this.togglePasswordVisibility());
    });

    const input = document.querySelector('#register-phone') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'np',
      onlyCountries: ['np'],
      utilsScript: "'node_modules/intl-tel-input/build/js/utils.js'",
    });

    this.innerElements.signupForm.addEventListener(
      'submit',
      async (event: Event) => {
        event.preventDefault();
        this.clearError(this.innerElements.fullNameError);
        this.clearError(this.innerElements.registerEmailError);
        this.clearError(this.innerElements.registerPasswordError);
        this.clearError(this.innerElements.confirmPasswordError);
        this.clearError(this.innerElements.phoneError);
        this.clearError(this.innerElements.registerResponseMessage);

        let isValid = true;

        if (!this.validateFullName(this.innerElements.fullNameInput.value)) {
          this.showError(
            this.innerElements.fullNameError,
            'Please enter a valid name.',
          );
          isValid = false;
        }

        if (!this.validateEmail(this.innerElements.registerEmailInput.value)) {
          this.showError(
            this.innerElements.registerEmailError,
            'Please enter a valid email.',
          );
          isValid = false;
        }

        if (
          !this.validatePassword(this.innerElements.registerPasswordInput.value)
        ) {
          this.showError(
            this.innerElements.registerPasswordError,
            'Must be 4 character long, 1 uppercase and 1 special character',
          );
          isValid = false;
        }
        if (
          !this.validateConfirmPassword(
            this.innerElements.registerPasswordInput.value,
            this.innerElements.confirmPasswordInput.value,
          )
        ) {
          this.showError(
            this.innerElements.confirmPasswordError,
            'Must be same as the password',
          );
          isValid = false;
        }
        if (
          !this.validatePhoneNumber(this.innerElements.phoneNumberInput.value)
        ) {
          this.showError(
            this.innerElements.phoneError,
            'Please enter a valid phone number.',
          );
          isValid = false;
        }

        if (isValid) {
          const formData = {
            name: this.innerElements.fullNameInput.value,
            email: this.innerElements.registerEmailInput.value,
            password: this.innerElements.registerPasswordInput.value,
            phoneNumber: this.innerElements.phoneNumberInput.value,
          };
          const response = await this.register(
            this.innerElements.registerButton,
            formData,
          );

          if (response.status != HttpStatusCode.Accepted) {
            this.showError(
              this.innerElements.registerResponseMessage,
              response.message,
            );
          }
        }
      },
    );

    this.innerElements.signinForm.addEventListener(
      'submit',
      async (event: Event) => {
        event.preventDefault();

        this.clearError(this.innerElements.emailError);
        this.clearError(this.innerElements.passwordError);
        this.clearError(this.innerElements.registerResponseMessage);

        let isValid = true;

        const existingSpinner =
          this.innerElements.loginButton.querySelector('.loading-spinner');
        if (existingSpinner) {
          existingSpinner.remove();
        }
        if (!this.validateEmail(this.innerElements.emailInput.value)) {
          this.showError(
            this.innerElements.emailError,
            'Please enter a valid email.',
          );
          isValid = false;
        }

        if (!this.validatePassword(this.innerElements.passwordInput.value)) {
          this.showError(
            this.innerElements.passwordError,
            'Must be at least 4 characters long.',
          );
          isValid = false;
        }

        if (isValid) {
          const formData = {
            email: this.innerElements.emailInput.value,
            password: this.innerElements.passwordInput.value,
          };
          const response = await this.login(
            this.innerElements.loginButton,
            formData,
          );
          if (!response.response) {
            this.showError(
              this.innerElements.loginResponseMessage,
              'Network Error',
            );
            return;
          }
          if (response.response.status != HttpStatusCode.Accepted) {
            if (response.response.status == HttpStatusCode.Unauthorized) {
              this.showError(
                this.innerElements.loginResponseMessage,
                'Invalid Credentials',
              );
            } else if (response.response.status == HttpStatusCode.Forbidden) {
              this.showError(
                this.innerElements.loginResponseMessage,
                'Admin is not allowed',
              );
            } else {
              this.showError(
                this.innerElements.loginResponseMessage,
                response.message,
              );
            }
          }
        }
      },
    );
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/;
    return passwordRegex.test(password);
  }

  static validateFullName(fullName: string): boolean {
    const nameRegex = /^[a-zA-Z ]{4,}$/;
    return nameRegex.test(fullName);
  }

  static validateConfirmPassword(
    password: string,
    confirmPassword: string,
  ): boolean {
    return confirmPassword == password;
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
    formData: IAuthUser,
  ) {
    const spinner = LoaderSpinner.render(20);
    formSubmissionButton.innerText = 'Logging In';
    formSubmissionButton.classList.add('auth-card__button--loading');
    formSubmissionButton.appendChild(spinner);

    formSubmissionButton.disabled = true;
    return await login(formData)
      .then((data) => {
        Modal.toggle();
        StateManager.updateState('accessToken', data.accessToken);
        StateManager.updateState('user', data.user);
        Toast.show('User Logged In');
        Cart.fetchCartItems();
        history.pushState(null, '', '/');
        navigate('/');
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
    formData: ICreateUser,
  ) {
    const spinner = LoaderSpinner.render(20);

    formSubmissionButton.innerText = 'Signing Up';
    formSubmissionButton.classList.add('auth-card__button--loading');
    formSubmissionButton.appendChild(spinner);

    formSubmissionButton.disabled = true;

    return await register(formData)
      .then((data) => {
        Modal.toggle();
        Toast.show('User Signed Up');
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
