import { fetchUserRestaurant } from '../../../../api-routes/restaurant';
import { fetchTargetReviews } from '../../../../api-routes/review';
import { fetchUser } from '../../../../api-routes/users';
import { makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { ReviewTargetType } from '../../../../enums/review';
import { IRestaurant } from '../../../../interfaces/restaurant';
import { IReview, IReviewResponse } from '../../../../interfaces/review';
import IUser from '../../../../interfaces/users';

export default class RestaurantReviewDashboard {
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
          this.fetchRestaurantReviews();
        });
    }
    return this.element;
  }

  static async fetchRestaurantReviews() {
    const restaurant = (await makeApiCall(
      fetchUserRestaurant,
    )) as unknown as IRestaurant;
    const reviews = await makeApiCall(fetchTargetReviews, restaurant.id);
    const restaurantReviews = reviews as unknown as IReview[];
    console.log(restaurantReviews);
    this.render(restaurantReviews);
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

    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');

    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(accordionTitleWrapper);
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
  static accordionHeaderEventListener(
    accordionHeader: HTMLDivElement,
    reviewId: string,
  ) {}
  static async render(restaurantReviews: IReview[]) {
    const dishReviewContainer = this.element.querySelector(
      '#dish-review-container',
    ) as HTMLDivElement;
    dishReviewContainer.style.display = 'none';
    const reviewRestaurantContainer = this.element.querySelector(
      '#review-restaurant',
    ) as HTMLDivElement;
    if (!restaurantReviews.length) {
      reviewRestaurantContainer.innerHTML = '<h3>No reviews</h3>';
    }
    restaurantReviews.forEach(async (review) => {
      const customer = (await makeApiCall(
        fetchUser,
        review.userId,
      )) as unknown as IUser;

      const reviewSummary = {
        customerName: customer.name,
        comment: review.comment,
        postedDate: new Date(review.updatedAt).toDateString(),
      };
      const heading = `Review by ${customer.name}`;
      const accordionContentElement =
        await this.renderAccordionContent(reviewSummary);
      const accordionHeaderElement = this.createAccordionHeader(heading);
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
        params: review.id,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);

      reviewRestaurantContainer!.appendChild(accordion.element);
    });
  }
}
