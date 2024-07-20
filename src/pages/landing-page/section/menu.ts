import MenuItem from '../../../components/menuItem';

export default class Menu {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/menu.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('menu');
          this.element.innerHTML = html;
          for (let i = 0; i < 5; i++) {
            const menuItem = new MenuItem(
              `id-${i + 1}`,
              'Samaybaji',
              './assets/images/home-img.png',
              1,
              150,
              true,
              'large',
            );
            document.getElementById('menu-list')!.appendChild(menuItem.element);
          }
        });
    }
    return this.element;
  }
}
