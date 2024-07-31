import DashboardLayout from '../dashboard/layout';

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
  static setEventListeners() {
    const loginButton = this.element.querySelector(
      '#admin-login-button',
    ) as HTMLButtonElement;
    loginButton.addEventListener('click', () => {
      this.renderDashboard();
    });
  }
  static render() {}
  static renderDashboard() {
    history.replaceState(null, '', 'admin/dashboard');
    this.element.innerHTML = '';
    this.element.classList.remove('admin-login');
    this.element.classList.add('admin-dashboard');
    this.element.appendChild(DashboardLayout.init('admin'));
  }
}
