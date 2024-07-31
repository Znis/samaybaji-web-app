import AuthCard from '../components/authCard';
import Modal from '../components/modal';
import { navigate } from '../router';
import { StateManager } from '../state-management/stateManager';
import Toast from '../components/toast';
import { Roles } from '../enums/roles';
import { RestaurantForm } from '../components/restaurantForm';
import { LoaderSpinner } from '../components/loaderSpinner';

export default class Header {
  static htmlTemplateURL = '/assets/templates/app-section/header.html';
  static element: HTMLElement = document.createElement('header');

  static init(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.innerHTML = html;
        this.initializeComponents();
      });
    return this.element;
  }

  static initializeComponents() {
    this.checkForAuthenticatedUser();
    this.setNavigationLinks();
    this.setupEventListeners();
    this.updateCartCount();
  }

  static get innerElements() {
    return {
      authButton: this.element.querySelector('#authentication') as HTMLElement,
      authenticatedUserElement: this.element.querySelector(
        '#authenticated-user',
      ) as HTMLDivElement,
      authenticatedUserName: this.element.querySelector(
        '.navbar__authenticated-user-name',
      ) as HTMLParagraphElement,
      registerRestaurant: this.element.querySelector(
        '#user-register-restaurant-link',
      ) as HTMLButtonElement,
      restaurantProfile: this.element.querySelector(
        '#user-restaurant-profile-link',
      ) as HTMLButtonElement,
      dashboardLink: this.element.querySelector(
        '#user-dashboard-link',
      ) as HTMLButtonElement,
      cartCountCircleDiv: this.element.querySelector(
        '#cart-count-circle',
      ) as HTMLDivElement,
      logoutLink: this.element.querySelector(
        '#user-logout',
      ) as HTMLButtonElement,
      modal: document.querySelector('.modal') as HTMLElement,
      homeNav: this.element.querySelector('#home-nav') as HTMLAnchorElement,
      menuNav: this.element.querySelector('#menu-nav') as HTMLAnchorElement,
      cartNav: this.element.querySelector('#cart-nav') as HTMLAnchorElement,
    };
  }

  static checkForAuthenticatedUser() {
    if (!StateManager.state.user) return;

    const { authButton, authenticatedUserElement, authenticatedUserName } =
      this.innerElements;
    authButton.style.display = 'none';
    authenticatedUserElement.style.display = 'inline-block';
    authenticatedUserName.innerText = StateManager.state.user.name;
  }
  static async checkRestaurantStatus(): Promise<{
    hasRestaurant: boolean;
    verified: boolean;
  }> {
    // if (StateManager.state.user?.roleID !== Roles.CUSTOMER_WITH_RESTAURANT)
    //   return { hasRestaurant: false, verified: false };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ hasRestaurant: true, verified: true });
      }, 5000);
    });
  }
  static setupEventListeners() {
    const {
      authButton,
      dashboardLink,
      restaurantProfile,
      registerRestaurant,
      logoutLink,
    } = this.innerElements;

    this.setupNavLinkListeners();
    authButton.addEventListener('click', () => this.showAuthModal());
    dashboardLink.addEventListener('click', () =>
      this.navigateTo('/dashboard'),
    );
    restaurantProfile.addEventListener('click', () =>
      this.navigateTo('/restaurant/dashboard'),
    );
    registerRestaurant.addEventListener('click', () =>
      this.showRestaurantForm(),
    );
    logoutLink.addEventListener('click', () => this.logout());

    this.updateRoleBasedElementsVisibility();
  }

  static setupNavLinkListeners() {
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', (event) => {
        event.preventDefault();
        const href = navLink.getAttribute('href');
        this.navigateTo(href);
        this.setActiveNavLink(navLink, navLinks);
      });
    });
  }

  static navigateTo(href: string | null) {
    if (!href) return;
    history.pushState(null, '', href);
    navigate(href);
    window.scrollTo(0, 0);
  }

  static setActiveNavLink(navLink: Element, navLinks: NodeListOf<Element>) {
    navLinks.forEach((link) => link.classList.remove('active'));
    navLink.classList.add('active');
  }

  static showAuthModal() {
    Modal.toggle();
    this.innerElements.modal.appendChild(AuthCard.init());
  }

  static showRestaurantForm() {
    Modal.toggle();
    const modal = document.querySelector('.modal') as HTMLDivElement;
    modal.innerHTML = '';
    modal.appendChild(RestaurantForm.init('create'));
  }

  static async updateRoleBasedElementsVisibility() {
    if (!StateManager.state.user) return;

    const { registerRestaurant, restaurantProfile } = this.innerElements;
    if (StateManager.state.user.roleID !== Roles.CUSTOMER_WITH_RESTAURANT) {
      restaurantProfile.style.display = 'none';
      registerRestaurant.disabled = true;
      const spinner = LoaderSpinner.render(20);
      if (registerRestaurant.firstChild) {
        registerRestaurant.insertBefore(spinner, registerRestaurant.firstChild);
      } else {
        registerRestaurant.appendChild(spinner);
      }
      const { hasRestaurant, verified } = await this.checkRestaurantStatus();
      registerRestaurant.disabled = false;
      spinner.remove();
      if (hasRestaurant && !verified) {
        registerRestaurant.innerHTML = 'Waiting for verification';
        registerRestaurant.disabled = true;
      } else {
        registerRestaurant.disabled = false;
      }
    } else {
      registerRestaurant.style.display = 'none';
    }
  }

  static logout() {
    StateManager.resetState();
    history.pushState(null, '', '/');
    navigate('/');
    Toast.show('User Logged Out');
  }

  static setNavigationLinks() {
    const { homeNav, menuNav, cartNav } = this.innerElements;
    homeNav.href = '/';
    menuNav.href = '/menu';
    cartNav.href = '/cart';
  }

  static updateCartCount() {
    const { cartCountCircleDiv } = this.innerElements;
    const cartLength = StateManager.state.cart.length;

    if (cartLength === 0) {
      cartCountCircleDiv.style.display = 'none';
      return;
    }

    cartCountCircleDiv.style.display = 'flex';
    cartCountCircleDiv.querySelector('#cart-count')!.textContent =
      cartLength.toString();
  }
}
