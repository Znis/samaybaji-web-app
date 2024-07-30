import OrdersDashboard from './section/orders';

export default class DashboardLayout {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/layout.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard-page');
          this.element.innerHTML = html;
          this.render();
        });
    }
    return this.element;
  }
  static render() {
    const orderContainer = this.element.querySelector(
      '.main-container',
    ) as HTMLDivElement;
    orderContainer.appendChild(OrdersDashboard.init());
  }
}
