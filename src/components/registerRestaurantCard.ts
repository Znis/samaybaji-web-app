import { ICreateRestaurant } from '../interfaces/restaurant';
import Modal from './modal';

export class RegisterRestaurantCard {
  static htmlTemplateURL =
    '/assets/templates/components/restaurant-registration-card.html';
  static element = document.createElement('div');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('restaurant-registration-modal');
          this.element.innerHTML = html;
          this.setupEventListeners();
        });
    }
    return this.element;
  }
  static setupEventListeners() {
    const crossButton = this.element.querySelector(
      '#modal-cross-button',
    ) as HTMLElement;
    crossButton.addEventListener('click', () => Modal.toggle());
  }

  static validateForm(event: Event): boolean {
    event.preventDefault();

    const formData: ICreateRestaurant = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement)
        .value,
      location: (document.getElementById('location') as HTMLInputElement).value,
      contactNumber: (
        document.getElementById('contactNumber') as HTMLInputElement
      ).value,
      openHours: (document.getElementById('openHours') as HTMLInputElement)
        .value,
      profilePic:
        (document.getElementById('profilePic') as HTMLInputElement)
          .files?.[0] || null,
      coverPic:
        (document.getElementById('coverPic') as HTMLInputElement).files?.[0] ||
        null,
      panNumber: (document.getElementById('panNumber') as HTMLInputElement)
        .value,
      userID: (document.getElementById('userID') as HTMLInputElement).value,
    };

    if (
      !formData.name ||
      !formData.description ||
      !formData.location ||
      !formData.contactNumber ||
      !formData.openHours ||
      !formData.profilePic ||
      !formData.coverPic ||
      !formData.panNumber ||
      !formData.userID
    ) {
      alert('All fields are required.');
      return false;
    }

    if (formData.profilePic && !this.isValidImage(formData.profilePic)) {
      alert('Invalid profile picture. Please upload a valid image file.');
      return false;
    }

    if (formData.coverPic && !this.isValidImage(formData.coverPic)) {
      alert('Invalid cover picture. Please upload a valid image file.');
      return false;
    }

    alert('Form submitted successfully!');
    return true;
  }

  static isValidImage(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
}
