export default class Footer {
  static htmlTemplateURL = './assets/templates/app-section/footer.html';
  static element: HTMLElement = document.createElement('footer');

  static render(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.innerHTML = html;
      });

    return this.element;
  }
}
