export default class EditRestaurantDetailsDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/edit-detail.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          this.innerElements();
          this.render();
        });
    }
    return this.element;
  }

  static innerElements() {
    return {
      userEditDetailsForm: this.element.querySelector(
        '#user-edit-details',
      ) as HTMLFormElement,
      restaurantEditDetailsForm: this.element.querySelector(
        '#restaurant-edit-details',
      ) as HTMLFormElement,
      restaurantName: this.element.querySelector(
        '#restaurant-name',
      ) as HTMLInputElement,
      restaurantDescription: this.element.querySelector(
        '#restaurant-description',
      ) as HTMLTextAreaElement,
    };
  }

  static async render() {
    this.innerElements().userEditDetailsForm.style.display = 'none';
  }
}
