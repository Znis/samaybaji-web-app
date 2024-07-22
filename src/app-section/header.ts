import AuthCard from '../components/authCard.ts';
import Modal from '../components/modal.ts';
import Cart from '../pages/cart/cart.ts';
import { navigate } from '../router.ts';

export default class Header {
  static htmlTemplateURL = '/assets/templates/app-section/header.html';
  static element: HTMLElement = document.createElement('header');

  static init(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.innerHTML = html;
        this.setNavigationLinks();
        this.setupEventListeners();
      });
    return this.element;
  }
  static setupEventListeners() {
    const navLinks = document.querySelectorAll('.navbar__link');

    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', (event) => {
        event.preventDefault();

        const href = navLink.getAttribute('href');
        history.pushState(null, '', href);
        navigate(href!);
        window.scrollTo(0, 0);

        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        navLink.classList.add('active');
      });
    });
    document.getElementById('authentication')?.addEventListener('click', () => {
      Modal.toggle();
      document.querySelector('.modal')!.appendChild(AuthCard.init());
    });
  }

  static setNavigationLinks(): void {
    const homeNav = this.element.querySelector(
      '#home-nav',
    ) as HTMLAnchorElement;
    const menuNav = this.element.querySelector(
      '#menu-nav',
    ) as HTMLAnchorElement;
    const aboutNav = this.element.querySelector(
      '#about-nav',
    ) as HTMLAnchorElement;
    const cartNav = this.element.querySelector(
      '#cart-nav',
    ) as HTMLAnchorElement;

    homeNav.href = '/';
    menuNav.href = '/menu';
    aboutNav.href = '/about';
    cartNav.href = '/cart';
  }

  static updateCartCount() {
    const cartLength = Cart.cartList.length;
    const cartCountCircleDiv = this.element.querySelector(
      '#cart-count-circle',
    ) as HTMLDivElement;

    if (!cartLength) {
      cartCountCircleDiv.style.display = 'none';
      return;
    }

    cartCountCircleDiv.style.display = 'flex';
    this.element.querySelector('#cart-count')!.innerHTML =
      cartLength.toString();
  }
}
