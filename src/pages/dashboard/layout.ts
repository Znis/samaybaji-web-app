import ReviewDashboard from './restaurant/section/review';
import EditDetailsDashboard from './restaurant/section/editDetail';
import MenuDashboard from './restaurant/section/menu';
import OrdersDashboard from './restaurant/section/orders';
import AdminMenuDashboard from './admin/section/menu';
import AdminOrdersDashboard from './admin/section/orders';
import AdminUsersDashboard from './admin/section/users';
import AdminRestaurantsDashboard from './admin/section/restaurant';
import AdminReviewDashboard from './admin/section/review';
import RestaurantMenuDashboard from './restaurant/section/menu';
import RestaurantOrdersDashboard from './restaurant/section/orders';
import RestaurantReviewDashboard from './restaurant/section/review';
import CustomerOrdersDashboard from './customer/section/orders';
import CustomerReviewDashboard from './customer/section/review';

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
        userMenuOption: this.element.querySelector(
          '#users-option',
        ) as HTMLElement,
        ordersMenuOption: this.element.querySelector(
          '#orders-option',
        ) as HTMLElement,
        reviewsMenuOption: this.element.querySelector(
          '#reviews-option',
        ) as HTMLElement,
        menuOption: this.element.querySelector('#menu-option') as HTMLElement,
        restaurantMenuOption: this.element.querySelector(
          '#restaurants-option',
        ) as HTMLElement,
      },
      restaurant: {
        ordersMenuOption: this.element.querySelector(
          '#orders-option',
        ) as HTMLElement,
        reviewsMenuOption: this.element.querySelector(
          '#reviews-option',
        ) as HTMLElement,
        menuOption: this.element.querySelector('#menu-option') as HTMLElement,
        editDetailsOption: this.element.querySelector(
          '#edit-details-option',
        ) as HTMLElement,
      },
      customer: {
        ordersMenuOption: this.element.querySelector(
          '#orders-option',
        ) as HTMLElement,
        reviewsMenuOption: this.element.querySelector(
          '#reviews-option',
        ) as HTMLElement,
        editDetailsOption: this.element.querySelector(
          '#edit-details-option',
        ) as HTMLElement,
      },
    };
  }

  static setActiveMenuOption(
    role: { [key: string]: HTMLElement | null },
    activeOption: HTMLElement,
  ) {
    Object.values(role).forEach((option: HTMLElement | null) => {
      if (option === activeOption) {
        option.classList.add('aside__menu-option--active');
      } else {
        option!.classList.remove('aside__menu-option--active');
      }
    });
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
    const innerElems = this.innerElements();
    if (type === 'admin') {
      this.renderContent(AdminUsersDashboard.init());
      this.innerElements().admin.userMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(AdminUsersDashboard.init());
          this.setActiveMenuOption(
            innerElems.admin,
            innerElems.admin.userMenuOption!,
          );
        },
      );
      this.innerElements().admin.menuOption!.addEventListener('click', () => {
        this.renderContent(AdminMenuDashboard.init());
        this.setActiveMenuOption(
          innerElems.admin,
          innerElems.admin.menuOption!,
        );
      });
      this.innerElements().admin.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(AdminOrdersDashboard.init());
          this.setActiveMenuOption(
            innerElems.admin,
            innerElems.admin.ordersMenuOption!,
          );
        },
      );
      this.innerElements().admin.restaurantMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(AdminRestaurantsDashboard.init());
          this.setActiveMenuOption(
            innerElems.admin,
            innerElems.admin.restaurantMenuOption!,
          );
        },
      );
      this.innerElements().admin.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(AdminReviewDashboard.init());
          this.setActiveMenuOption(
            innerElems.admin,
            innerElems.admin.reviewsMenuOption!,
          );
        },
      );
    } else if (type === 'restaurant') {
      this.renderContent(RestaurantMenuDashboard.init());

      this.innerElements().restaurant.editDetailsOption!.addEventListener(
        'click',
        () => {
          this.renderContent(EditDetailsDashboard.init());
          this.setActiveMenuOption(
            innerElems.restaurant,
            innerElems.restaurant.editDetailsOption!,
          );
        },
      );
      this.innerElements().restaurant.menuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(RestaurantMenuDashboard.init());
          this.setActiveMenuOption(
            innerElems.restaurant,
            innerElems.restaurant.menuOption!,
          );
        },
      );
      this.innerElements().restaurant.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(RestaurantOrdersDashboard.init());
          this.setActiveMenuOption(
            innerElems.restaurant,
            innerElems.restaurant.ordersMenuOption!,
          );
        },
      );
      this.innerElements().restaurant.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(RestaurantReviewDashboard.init());
          this.setActiveMenuOption(
            innerElems.restaurant,
            innerElems.restaurant.reviewsMenuOption!,
          );
        },
      );
    } else {
      this.renderContent(CustomerOrdersDashboard.init());

      this.innerElements().customer.ordersMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(CustomerOrdersDashboard.init());
          this.setActiveMenuOption(
            innerElems.customer,
            innerElems.customer.ordersMenuOption!,
          );
        },
      );
      this.innerElements().customer.reviewsMenuOption!.addEventListener(
        'click',
        () => {
          this.renderContent(CustomerReviewDashboard.init());
          this.setActiveMenuOption(
            innerElems.customer,
            innerElems.customer.reviewsMenuOption!,
          );
        },
      );
      this.innerElements().customer.editDetailsOption!.addEventListener(
        'click',
        () => {
          this.renderContent(EditDetailsDashboard.init());
          this.setActiveMenuOption(
            innerElems.customer,
            innerElems.customer.editDetailsOption!,
          );
        },
      );
    }
  }
  static renderContent(element: HTMLElement) {
    const mainContainer = this.element.querySelector(
      '.main-container',
    ) as HTMLDivElement;
    mainContainer.innerHTML = '';
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
