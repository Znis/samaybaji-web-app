import axios from 'axios';
import { adminLogin } from '../../api-routes/auth';
import { LoaderSpinner } from '../../components/loaderSpinner';
import Toast from '../../components/toast';
import { IAuthUser } from '../../interfaces/users';
import DashboardLayout from '../dashboard/layout';
import { Roles } from '../../enums/roles';

export default class AdminLogin {
  static htmlTemplateurl = '/assets/templates/pages/admin/admin-login.html';
  static element: HTMLElement = document.createElement('div');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('admin-login');
          this.element.innerHTML = html;
          this.setEventListeners();
          this.render();
        });
    }

    return this.element;
  }
  static get innerElements() {
    return {
      emailInput: this.element.querySelector(
        '#admin-login-email',
      ) as HTMLInputElement,
      password: this.element.querySelector(
        '#admin-login-password',
      ) as HTMLInputElement,
      loginButton: this.element.querySelector(
        '#admin-login-button',
      ) as HTMLButtonElement,
      loginForm: this.element.querySelector(
        '.admin-login__form',
      ) as HTMLFormElement,
    };
  }
  static setEventListeners() {
    this.innerElements.loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!this.innerElements.loginForm.checkValidity()) {
        this.innerElements.loginForm.reportValidity();
        return;
      }
      const spinner = LoaderSpinner.render(20);
      try {
        this.innerElements.loginButton.appendChild(spinner);
        this.innerElements.loginButton.disabled = true;
        const response = await adminLogin({
          email: this.innerElements.emailInput.value,
          password: this.innerElements.password.value,
        } as IAuthUser);
        if (response.user.roleId != Roles.SUPERADMIN) {
          throw new Error('Not a super admin');
        }
        this.innerElements.loginButton.disabled = false;
        this.innerElements.loginButton.removeChild(spinner);
        this.renderDashboard(response.accessToken);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          Toast.show(error.response?.data.message);
        } else {
          Toast.show('An unexpected error occurred');
        }
        this.innerElements.loginButton.disabled = false;
        this.innerElements.loginButton.removeChild(spinner);
      }
    });
  }
  static render() {}
  static renderDashboard(accessToken: string) {
    history.replaceState(null, '', 'admin/dashboard');
    this.element.innerHTML = '';
    this.element.classList.remove('admin-login');
    this.element.classList.add('admin-dashboard');
    this.element.appendChild(DashboardLayout.init('admin', accessToken));
  }
}
