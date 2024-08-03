import AdminUsersDashboard from './admin/section/users';
import RestaurantMenuDashboard from './restaurant/section/menu';
import RestaurantOrdersDashboard from './restaurant/section/orders';
import RestaurantReviewDashboard from './restaurant/section/review';
import CustomerOrdersDashboard from './customer/section/orders';
import CustomerReviewDashboard from './customer/section/review';
import EditCustomerDetailsDashboard from './customer/section/editDetail';
import EditRestaurantDetailsDashboard from './restaurant/section/editDetail';
import { StateManager } from '../../state-management/stateManager';
import { makeApiCall } from '../../apiCalls';
import { fetchRestaurantInfo } from '../../api-routes/restaurant';
import { IRestaurant } from '../../interfaces/restaurant';

export default class DashboardLayout {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/layout.html';
  static adminAccessToken = '';
  static init(type: string, adminAccessToken?: string): HTMLElement {
    if (adminAccessToken) this.adminAccessToken = adminAccessToken;
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then(async (html) => {
          this.element.classList.add('dashboard-page');
          this.element.innerHTML = html;
          await this.renderSidebar(type);
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
  static async renderSidebar(type: string) {
    if (type === 'admin') {
      this.renderAdminSidebar();
    } else if (type === 'restaurant') {
      await this.renderRestaurantSidebar();
    } else {
      this.renderCustomerSidebar();
    }
  }
  static setEventListeners(type: string) {
    const innerElems = this.innerElements();
    if (type === 'admin') {
      this.renderContent(AdminUsersDashboard.init(this.adminAccessToken));
      this.setActiveMenuOption(
        innerElems.admin,
        innerElems.admin.userMenuOption!,
      );
    } else if (type === 'restaurant') {
      this.renderContent(RestaurantMenuDashboard.init());

      this.innerElements().restaurant.editDetailsOption!.addEventListener(
        'click',
        () => {
          this.renderContent(EditRestaurantDetailsDashboard.init());
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
          this.renderContent(EditCustomerDetailsDashboard.init());
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
    profileImage.setAttribute(
      'src',
      StateManager.state.user?.imageSrc || '/assets/images/user.jpg',
    );
    const profileName = this.element.querySelector(
      '.aside__profile-name',
    ) as HTMLParagraphElement;
    profileName.innerHTML = StateManager.state.user?.name || 'Customer';
    const menuContainer = this.element.querySelector(
      '.aside__menu',
    ) as HTMLDivElement;
    menuContainer.innerHTML = '';
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
  static async renderRestaurantSidebar() {
    const profileImage = this.element.querySelector(
      '.aside__profile-image',
    ) as HTMLImageElement;
    const restaurantInfo = (await makeApiCall(
      fetchRestaurantInfo,
      StateManager.state.user?.restaurantId as string,
    )) as unknown as IRestaurant;
    profileImage.setAttribute('src', restaurantInfo.profilePic);
    const profileName = this.element.querySelector(
      '.aside__profile-name',
    ) as HTMLParagraphElement;
    profileName.innerHTML = restaurantInfo.name || 'Restaurant';
    const menuContainer = this.element.querySelector(
      '.aside__menu',
    ) as HTMLDivElement;
    menuContainer.innerHTML = '';
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
    profileImage.setAttribute('src', '/assets/images/user.jpg');
    const profileName = this.element.querySelector(
      '.aside__profile-name',
    ) as HTMLParagraphElement;
    profileName.innerHTML = 'Admin';
    const menuContainer = this.element.querySelector(
      '.aside__menu',
    ) as HTMLDivElement;
    menuContainer.innerHTML = '';
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
  }
}
