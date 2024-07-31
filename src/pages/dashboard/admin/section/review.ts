import { Accordion } from '../../../../components/accordion';
import { IReview } from '../../../../interfaces/review';

export default class AdminReviewDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/review.html';
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

    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');

    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(iconWrapper);
    return accordionHeader;
  }

  static async initialiseAccordionContent() {
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    const templateUrl =
      '/assets/templates/components/review-accordion-content.html';

    await fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        accordionContent.innerHTML = html;
      });
    return accordionContent;
  }
  static async renderAccordionContent(review: { [key: string]: string }) {
    const accordionContent = await this.initialiseAccordionContent();
    const reviewCustomerName = accordionContent.querySelector(
      '#review-customer-name',
    ) as HTMLSpanElement;
    reviewCustomerName.innerHTML = `${review.customerName || ''}`;
    const reviewComment = accordionContent.querySelector(
      '#review-comment',
    ) as HTMLSpanElement;
    reviewComment.innerHTML = `${review.comment || ''}`;
    const reviewPostedDate = accordionContent.querySelector(
      '#review-posted-date',
    ) as HTMLSpanElement;
    reviewPostedDate.innerHTML = `${review.postedDate || ''}`;
    const reviewRating = accordionContent.querySelector(
      '#review-rating',
    ) as HTMLSpanElement;
    reviewRating.innerHTML = `${review.rating || 'Not Rated'}`;

    return accordionContent;
  }
  static async render(reviews: IReview[]) {
    reviews.forEach(async (review) => {
      const reviewSummary = {
        customerName: review.userID,
        comment: review.comment,
        postedDate: review.postedDate.toDateString(),
      };
      const heading = `Review by ${review.id}`;
      const accordionContentElement =
        await this.renderAccordionContent(reviewSummary);
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
