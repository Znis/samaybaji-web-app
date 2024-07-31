import { Accordion } from '../../../../components/accordion';
import { IRestaurant } from '../../../../interfaces/restaurant';
import IUser from '../../../../interfaces/users';

export default class AdminRestaurantsDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/restaurant.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          //   this.fetchRestaurantReview();
        });
    }
    return this.element;
  }

  //   static async fetchRestaurantReview() {
  //     const menuItems = await makeApiCall(fetchAllMenuItems);
  //     console.log(menuItems);
  //     this.render(menuItems as unknown as IMenuItem[]);
  //   }
  static createAccordionHeader(heading: string) {
    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';

    const accordionTitleWrapper = document.createElement('div');
    accordionTitleWrapper.className = 'accordion-title-wrapper';

    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-circle-check accordion-header-icon';
    accordionTitleWrapper.appendChild(checkIcon);

    const accordionTitle = document.createElement('p');
    accordionTitle.className = 'accordion-title';
    accordionTitle.innerText = heading;
    accordionTitleWrapper.appendChild(accordionTitle);

    const approveIcon = document.createElement('i');
    approveIcon.className =
      'fa-solid fa-angle-down accordion-header-action-icon';

    approveIcon.id = 'approve-restaurant';
    accordionHeader.appendChild(approveIcon);

    const deleteOrderIcon = document.createElement('i');
    deleteOrderIcon.className =
      'fa-solid fa-check accordion-header-action-icon';
    deleteOrderIcon.id = 'delete-order';
    accordionHeader.appendChild(deleteOrderIcon);
    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');
    iconWrapper.appendChild(approveIcon);
    iconWrapper.appendChild(deleteOrderIcon);
    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(iconWrapper);
    return accordionHeader;
  }

  static async initialiseAccordionContent() {
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    const templateUrl =
      '/assets/templates/components/user-accordion-content.html';

    await fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        accordionContent.innerHTML = html;
      });
    return accordionContent;
  }
  static async renderAccordionContent(restaurant: { [key: string]: string }) {
    const accordionContent = await this.initialiseAccordionContent();
    const restaurantProfileImage = accordionContent.querySelector(
      '#restaurant-profile-image',
    ) as HTMLImageElement;
    restaurantProfileImage.setAttribute('src', restaurant.profileImgSrc || '');
    const restaurantCoverImage = accordionContent.querySelector(
      '#restaurant-cover-image',
    ) as HTMLImageElement;
    restaurantCoverImage.setAttribute('src', restaurant.coverImgSrc || '');
    const restaurantName = accordionContent.querySelector(
      '#restaurant-name',
    ) as HTMLSpanElement;
    restaurantName.innerHTML = `${restaurant.name || ''}`;
    const restaurantLocation = accordionContent.querySelector(
      '#restaurant-location',
    ) as HTMLSpanElement;
    restaurantLocation.innerHTML = `${restaurant.location || ''}`;
    const restaurantDescription = accordionContent.querySelector(
      '#restaurant-desc',
    ) as HTMLSpanElement;
    restaurantDescription.innerHTML = `${restaurant.description || ''}`;
    const panNumber = accordionContent.querySelector(
      '#restaurant-pan-number',
    ) as HTMLSpanElement;
    panNumber.innerHTML = `${restaurant.panNumber || ''}`;
    const restaurantOpenHours = accordionContent.querySelector(
      '#restaurant-open-hours',
    ) as HTMLSpanElement;
    restaurantOpenHours.innerHTML = `${restaurant.openHours || ''}`;
    const restaurantPhoneNumber = accordionContent.querySelector(
      '#restaurant-phone-number',
    ) as HTMLSpanElement;
    restaurantPhoneNumber.innerHTML = `${restaurant.phoneNumber || ''}`;

    return accordionContent;
  }
  static async render(restaurants: IRestaurant[]) {
    restaurants.forEach(async (restaurant) => {
      const restaurantSummary = {
        name: restaurant.name,
        profileImgSrc: restaurant.profilePic || '',
        coverImgSrc: restaurant.coverPic || '',
        location: restaurant.location,
        description: restaurant.description,
        panNumber: restaurant.panNumber,
        openHours: restaurant.openHours,
        phoneNumber: restaurant.contactNumber,
      };
      const heading = `${restaurant.name}`;
      const accordionContentElement =
        await this.renderAccordionContent(restaurantSummary);
      const accordionHeaderElement = this.createAccordionHeader(heading);
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: () => null,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);

      const reviewContainer = this.element.querySelector(
        '#review-container',
      ) as HTMLDivElement;

      reviewContainer!.appendChild(accordion.element);
    });
  }
}
