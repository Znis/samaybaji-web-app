import { createReview, editReview } from '../../../api-routes/review';
import { fetchUser } from '../../../api-routes/users';
import { makeApiCall } from '../../../apiCalls';
import CustomerReview from '../../../components/customerReview';
import Toast from '../../../components/toast';
import { ReviewTargetType } from '../../../enums/review';
import { ICreateReview, IReview } from '../../../interfaces/review';
import { StateManager } from '../../../state-management/stateManager';

export default class DishReview {
  static htmlTemplateURL =
    '/assets/templates/pages/dish-detail/section/dish-review.html';
  static element = document.createElement('section');
  static html = '';
  static dishId = '';

  static init(dishReviews: IReview[], dishId: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-review');
          this.html = html;
          this.dishId = dishId;
          this.render(dishReviews);
          this.setEventListeners();
        });
    }
    return this.element;
  }
  static async render(dishReviews: IReview[]) {
    this.element.innerHTML = this.html;
    const toggleButton = this.element.querySelector(
      '#add-review-toggle-button',
    ) as HTMLButtonElement;
    toggleButton.disabled = true;
    if (StateManager.state.user) {
      toggleButton.disabled = false;
      const ownReview = dishReviews.find((review) => {
        return review.userId == StateManager.state.user!.id;
      });
      if (ownReview) {
        toggleButton.innerHTML = 'Edit Review';
        const customerReview = new CustomerReview(
          ownReview,
          StateManager.state.user,
        );
        this.element
          .querySelector('.dish-review__customer-reviews')!
          .appendChild(customerReview.element);
      }
    }

    dishReviews.forEach(async (dishReview) => {
      const customer = await fetchUser(dishReview.userId);
      if (dishReview.userId != StateManager.state.user?.id) {
        const customerReview = new CustomerReview(dishReview, customer);
        this.element
          .querySelector('.dish-review__customer-reviews')!
          .appendChild(customerReview.element);
      }
    });
  }
  static setEventListeners() {
    const toggleButton = this.element.querySelector(
      '#add-review-toggle-button',
    );
    const postButton = this.element.querySelector('#post-review-button');
    const reviewContainer = this.element.querySelector(
      '.dish-review__review-input-wrapper',
    );
    const reviewInputBox = this.element.querySelector(
      '.dish-review__review-inputbox',
    ) as HTMLTextAreaElement;
    const reviewForm = this.element.querySelector(
      '.dish-review__form',
    ) as HTMLFormElement;
    reviewForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!reviewForm.checkValidity()) {
        reviewForm.reportValidity();
        return;
      }
      if (
        toggleButton?.innerHTML === 'Edit Review' &&
        StateManager.state.user
      ) {
        try {
          await makeApiCall(
            editReview,
            {
              comment: reviewInputBox.value,
              targetType: ReviewTargetType.DISH,
              userId: StateManager.state.user!.id,
            } as ICreateReview,
            this.dishId,
          );
        } catch (error) {
          console.log(error);
          Toast.show('Failed to post review');
        }
      } else {
        try {
          await makeApiCall(
            createReview,
            {
              comment: reviewInputBox.value,
              targetType: ReviewTargetType.DISH,
              userId: StateManager.state.user!.id,
            } as ICreateReview,
            this.dishId,
          );
        } catch (error) {
          console.log(error);
          Toast.show('Failed to post review');
        }
      }
    });

    if (toggleButton && reviewInputBox && reviewContainer && postButton) {
      toggleButton.addEventListener('click', () => {
        reviewInputBox.classList.toggle('visible');
        postButton.classList.toggle('visible');
        if (toggleButton.innerHTML === 'Add Review') {
          toggleButton.innerHTML = 'Cancel';
        } else {
          toggleButton.innerHTML = 'Add Review';
        }
      });
    }
  }
}
