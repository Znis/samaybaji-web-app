import axios from 'axios';
import { deleteUserByAdmin, fetchAllUsers } from '../../../../api-routes/users';
import { Accordion } from '../../../../components/accordion';
import Toast from '../../../../components/toast';
import IUser from '../../../../interfaces/users';

export default class AdminUsersDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/user.html';
  static html = '';
  static adminAccessToken = '';
  static init(adminAccessToken: string): HTMLElement {
    this.adminAccessToken = adminAccessToken;
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.html = html;
          this.fetchAllUsers();
        });
    }
    return this.element;
  }

  static async fetchAllUsers() {
    this.element.innerHTML = this.html;
    const users = await fetchAllUsers(this.adminAccessToken);
    this.render(users as unknown as IUser[]);
  }
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

    const deleteOrderIcon = document.createElement('i');
    deleteOrderIcon.className =
      'fa-solid fa-trash accordion-header-danger-action-icon';
    deleteOrderIcon.id = 'delete-user';
    accordionHeader.appendChild(deleteOrderIcon);
    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');
    iconWrapper.appendChild(deleteOrderIcon);
    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(accordionTitleWrapper);
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
  static async renderAccordionContent(user: { [key: string]: string }) {
    const accordionContent = await this.initialiseAccordionContent();
    const userProfileImage = accordionContent.querySelector(
      '#user-profile-image',
    ) as HTMLImageElement;
    userProfileImage.setAttribute('src', user.profileImgSrc || '');
    const userFullName = accordionContent.querySelector(
      '#user-fullname',
    ) as HTMLSpanElement;
    userFullName.innerHTML = `${user.fullName || ''}`;
    const userEmail = accordionContent.querySelector(
      '#user-email',
    ) as HTMLSpanElement;
    userEmail.innerHTML = `${user.email || ''}`;
    const userPhoneNumber = accordionContent.querySelector(
      '#user-phone-number',
    ) as HTMLSpanElement;
    userPhoneNumber.innerHTML = `${user.phoneNumber || ''}`;

    return accordionContent;
  }
  static accordionHeaderEventListener(
    accordionHeader: HTMLDivElement,
    userId: string,
  ) {
    const deleteButton = accordionHeader.querySelector('#delete-user');
    deleteButton!.addEventListener('click', (event) => {
      event.stopPropagation();
      AdminUsersDashboard.deleteUser(userId);
      AdminUsersDashboard.fetchAllUsers();
    });
  }
  static async render(users: IUser[]) {
    const usersContainer = this.element.querySelector(
      '#users-container',
    ) as HTMLDivElement;
    usersContainer!.innerHTML = '';
    if (users.length == 1 || !users.length) {
      usersContainer.innerHTML = '<h3>No Users</h3>';
    }

    users.forEach(async (user) => {
      if (user.name === 'Admin') return;
      const userSummary = {
        fullName: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImgSrc: user.imageSrc || '',
      };
      const heading = `${user.name}`;
      const accordionContentElement =
        await this.renderAccordionContent(userSummary);
      const accordionHeaderElement = this.createAccordionHeader(heading);
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
        params: user.id,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);

      usersContainer!.appendChild(accordion.element);
    });
  }
  static async deleteUser(userId: string) {
    try {
      await deleteUserByAdmin(userId, this.adminAccessToken);
      Toast.show('User deleted successfully');
      this.fetchAllUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show(error.message);
      } else {
        Toast.show('An unexpected error occurred');
      }
    }
  }
}
