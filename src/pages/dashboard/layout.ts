import ReviewDashboard from './restaurant/section/review';
import EditDetailsDashboard from './restaurant/section/editDetail';
import MenuDashboard from './restaurant/section/menu';
import OrdersDashboard from './restaurant/section/orders';

export default class DashboardLayout {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/layout.html';
  static init(type: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard-page');
          this.element.innerHTML = html;
          this.renderSidebar(type);
          this.setEventListeners(type);
        });
    }
    return this.element;
  }
  static innerElements() {
    return {
      admin: {
        userMenuOption: this.element.querySelector('#users-option'),
        ordersMenuOption: this.element.querySelector('#orders-option'),
        reviewsMenuOption: this.element.querySelector('#reviews-option'),
        menuOption: this.element.querySelector('#menu-option'),
        restaurantMenuOption: this.element.querySelector('#restaurants-option'),
      },
      restaurant: {
        ordersMenuOption: this.element.querySelector('#orders-option'),
        reviewsMenuOption: this.element.querySelector('#reviews-option'),
        menuOption: this.element.querySelector('#menu-option'),
        editDetailsOption: this.element.querySelector('#edit-details-option'),
      },
      customer: {
        ordersMenuOption: this.element.querySelector('#orders-option'),
        reviewsMenuOption: this.element.querySelector('#reviews-option'),
        editDetailsOption: this.element.querySelector('#edit-details-option'),
      },
    };
  }

  static renderSidebar(type: string) {
    if (type === 'admin') {
      this.renderAdminSidebar();
    } else if (type === 'restaurant') {
      this.renderRestaurantSidebar();
    } else {
      this.renderCustomerSidebar();
    }
  }
  static setEventListeners(type: string) {
    if (type === 'admin') {
      this.innerElements().admin.userMenuOption!.addEventListener(
        'click',
        () => {},
      );
      this.innerElements().admin.menuOption!.addEventListener('click', () => {
        this.renderContent(MenuDashboard.init());
        this.innerElements().admin.menuOption!.classList.toggle(
          'aside__menu-option--active',
        );
      });
      this.innerElements().admin.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(OrdersDashboard.init());
          this.innerElements().admin.ordersMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().admin.restaurantMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(MenuDashboard.init());
          this.innerElements().admin.restaurantMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().admin.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(ReviewDashboard.init());
          this.innerElements().admin.reviewsMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
    } else if (type === 'restaurant') {
      this.innerElements().restaurant.editDetailsOption!.addEventListener(
        'click',
        () => {
          this.renderContent(EditDetailsDashboard.init());
          this.innerElements().restaurant.editDetailsOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().restaurant.menuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(MenuDashboard.init());
          this.innerElements().restaurant.menuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().restaurant.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(OrdersDashboard.init());
          this.innerElements().restaurant.ordersMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().restaurant.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(ReviewDashboard.init());
          this.innerElements().restaurant.reviewsMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
    } else {
      this.innerElements().customer.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(OrdersDashboard.init());
          this.innerElements().customer.ordersMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().customer.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(ReviewDashboard.init());
          this.innerElements().customer.reviewsMenuOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
      this.innerElements().customer.editDetailsOption!.addEventListener(
        'click',
        () => {
          this.renderContent(EditDetailsDashboard.init());
          this.innerElements().customer.editDetailsOption!.classList.toggle(
            'aside__menu-option--active',
          );
        },
      );
    }
  }
  static renderContent(element: HTMLElement) {
    const mainContainer = this.element.querySelector(
      '.main-container',
    ) as HTMLDivElement;
    mainContainer.appendChild(element);
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
  static renderAdminSidebar() {
    const profileImage = this.element.querySelector(
      '.aside__profile-image',
    ) as HTMLImageElement;
    profileImage.setAttribute('src', '/assets/images/logo.png');
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
    const restaurantMenuOption = document.createElement('div');
    restaurantMenuOption.classList.add('aside__menu-option');
    restaurantMenuOption.id = 'restaurants-option';
    restaurantMenuOption.innerText = 'Restaurants';
    const userMenuOption = document.createElement('div');
    userMenuOption.classList.add('aside__menu-option');
    userMenuOption.id = 'users-option';
    userMenuOption.innerText = 'Users';
    menuContainer.appendChild(userMenuOption);
    menuContainer.appendChild(restaurantMenuOption);
    menuContainer.appendChild(menuOption);
    menuContainer.appendChild(ordersMenuOption);
    menuContainer.appendChild(reviewsMenuOption);
  }
}
