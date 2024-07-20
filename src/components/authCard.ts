import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import Modal from './modal';
export default class AuthCard {
  static element = document.createElement('div');
  static htmlTemplateURL = './assets/templates/components/auth-card.html';
  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.outerHTML = html;
          const signupButton = document.getElementById('signup');
          const signinButton = document.getElementById('signin');
          const crossButtonRight = document.getElementById(
            'auth-card-cross-button-right',
          );
          const crossButtonLeft = document.getElementById(
            'auth-card-cross-button-left',
          );
          const passwordVisibility =
            document.getElementsByName('toggle-password');
          const activeBox = document.querySelector(
            '.auth-card__active-box',
          ) as HTMLElement;
          const signinForm = document.querySelector(
            '.auth-card__form--signin',
          ) as HTMLElement;
          const signupForm = document.querySelector(
            '.auth-card__form--signup',
          ) as HTMLElement;

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

          const input = document.querySelector('#phone') as HTMLInputElement;
          intlTelInput(input, {
            initialCountry: 'np',
            utilsScript: "'node_modules/intl-tel-input/build/js/utils.js'",
          });
        });
    }
    return this.element;
  }

  static togglePasswordVisibility = () => {
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
  };
}
