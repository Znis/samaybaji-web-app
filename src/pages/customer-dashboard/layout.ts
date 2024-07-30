import EditDetailsDashboard from './section/editDetail';
import MenuDashboard from './section/menu';
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
          this.renderRestaurantSidebar();
          this.render();
        });
    }
    return this.element;
  }
  static render() {
    const mainContainer = this.element.querySelector(
      '.main-container',
    ) as HTMLDivElement;
    mainContainer.appendChild(OrdersDashboard.init());
    // mainContainer.appendChild(MenuDashboard.init());
    // mainContainer.appendChild(EditDetailsDashboard.init());
  }
  static renderCustomerSidebar() {
    const profileImage = this.element.querySelector(
      '.aside__profile-image',
    ) as HTMLImageElement;
    profileImage.setAttribute('src', '/assets/images/home-img.png');
    const menuContainer = this.element.querySelector(
      '.aside__menu',
    ) as HTMLDivElement;
    const ordersMenuOption = document.createElement('div');
    ordersMenuOption.classList.add(
      'aside__menu-option',
      'aside__menu-option--active',
    );
    ordersMenuOption.id = 'orders-option';
    ordersMenuOption.innerText = 'Orders';
    const reviewsMenuOption = document.createElement('div');
    reviewsMenuOption.classList.add('aside__menu-option');
    reviewsMenuOption.id = 'reviews-option';
    reviewsMenuOption.innerText = 'Reviews';
    const editDetailsMenuOption = document.createElement('div');
    editDetailsMenuOption.classList.add('aside__menu-option');
    editDetailsMenuOption.id = 'edit-details-option';
    editDetailsMenuOption.innerText = 'Edit Details';
    menuContainer.appendChild(ordersMenuOption);
    menuContainer.appendChild(reviewsMenuOption);
    menuContainer.appendChild(editDetailsMenuOption);
  }
  static renderRestaurantSidebar() {
    const profileImage = this.element.querySelector(
      '.aside__profile-image',
    ) as HTMLImageElement;
    profileImage.setAttribute('src', '/assets/images/home-img.png');
    const menuContainer = this.element.querySelector(
      '.aside__menu',
    ) as HTMLDivElement;
    const menuOption = document.createElement('div');
    menuOption.classList.add(
      'aside__menu-option',
      'aside__menu-option--active',
    );
    menuOption.id = 'menu-option';
    menuOption.innerText = 'Menu';
    const ordersMenuOption = document.createElement('div');
    ordersMenuOption.classList.add('aside__menu-option');
    ordersMenuOption.id = 'orders-option';
    ordersMenuOption.innerText = 'Orders';
    const reviewsMenuOption = document.createElement('div');
    reviewsMenuOption.classList.add('aside__menu-option');
    reviewsMenuOption.id = 'reviews-option';
    reviewsMenuOption.innerText = 'Reviews';
    const editDetailsMenuOption = document.createElement('div');
    editDetailsMenuOption.classList.add('aside__menu-option');
    editDetailsMenuOption.id = 'edit-details-option';
    editDetailsMenuOption.innerText = 'Edit Details';
    menuContainer.appendChild(menuOption);
    menuContainer.appendChild(ordersMenuOption);
    menuContainer.appendChild(reviewsMenuOption);
    menuContainer.appendChild(editDetailsMenuOption);
  }
}
