import {
  createRating,
  editRating,
  fetchSpecificRating,
  fetchTargetRatings,
} from '../api-routes/rating';
import { makeApiCall } from '../apiCalls';
import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating, IRating } from '../interfaces/rating';
import { StateManager } from './../state-management/stateManager';
import Toast from './toast';
export default class Rating {
  static htmlTemplateURL: string = '/assets/templates/components/rating.html';
  static element: HTMLElement = document.createElement('div');
  static starMessages: string[] = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent',
  ];
  static numOfStars: number = 5;
  static rating: number = -1;
  static ratingCount = -1;
  static selectedIndex: number = -1;
  static html = '';
  static dishId = '';
  static init(dishId: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('rating');
          this.html = html;
          this.dishId = dishId;
          this.fetchRating();
        });
    }
    return this.element;
  }
  static async fetchRating() {
    this.element.innerHTML = this.html;
    const rating = (await fetchTargetRatings(this.dishId)) as unknown as {
      rating: number;
      count: number;
    };
    if (StateManager.state.user) {
      const ownRating = (await makeApiCall(
        fetchSpecificRating,
        this.dishId,
      )) as unknown as IRating[];

      if (ownRating.length) rating.rating = ownRating[0].rating;
    }
    this.rating = rating.rating || -1;
    this.ratingCount = rating.count;
    this.appendStars();
    this.render();
    if (StateManager.state.user) this.setupEventListeners();
  }
  static appendStars(): void {
    const starsWrapper = this.element.querySelector(
      '.rating__stars-wrapper',
    ) as HTMLDivElement;
    const ratingText = this.element.querySelector(
      '.rating__text',
    ) as HTMLParagraphElement;
    const ratingsCount = this.element.querySelector(
      '.rating__reviews-count',
    ) as HTMLParagraphElement;
    ratingsCount.innerHTML = `${this.ratingCount} reviews`;
    if (!StateManager.state.user) {
      ratingText.textContent = 'Please login to rate this dish.';
    }

    for (let i = 0; i < this.numOfStars; i++) {
      const starElement = document.createElement('i');
      starElement.classList.add('fa-regular', 'fa-star', 'rating__star');
      starElement.setAttribute('data-value', (i + 1).toString());
      starsWrapper.appendChild(starElement);
    }
  }
  static render() {
    if (this.rating !== null) {
      this.selectedIndex = this.rating;
      this.updateStars(this.rating);
      this.updateText(this.rating);
      this.updateScore(this.rating);
    }
  }
  static setupEventListeners(): void {
    const stars = this.element.querySelectorAll('.rating__star');

    stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => {
        this.updateStars(index);
        this.updateText(index);
        this.updateScore(index);
      });

      star.addEventListener('mouseout', () => {
        if (this.selectedIndex === -1) {
          this.resetStars();
          this.resetText();
          this.resetScore();
        } else {
          this.updateStars(this.selectedIndex);
          this.updateText(this.selectedIndex);
          this.updateScore(this.selectedIndex);
        }
      });
      star.addEventListener('click', () => {
        this.selectedIndex = index;
        this.updateStars(index);
        this.updateText(index);
        this.updateScore(index);
        if (StateManager.state.user) this.updateRatings(index);
      });
    });
  }
  static async updateRatings(index: number) {
    const ownRating = (await makeApiCall(
      fetchSpecificRating,
      this.dishId,
    )) as unknown as IRating[];
    if (ownRating.length) {
      try {
        await makeApiCall(
          editRating,
          {
            rating: index,
          } as IEditRating,
          ownRating[0].id,
        );
        this.fetchRating();
        Toast.show('Rating edited');
      } catch (error) {
        Toast.show('Rating edit failed');
      }
    } else {
      try {
        await makeApiCall(
          createRating,
          {
            rating: index,
            targetType: ReviewTargetType.DISH,
          } as ICreateRating,
          this.dishId,
        );
        this.fetchRating();
        Toast.show('Rating done successfully');
      } catch (error) {
        Toast.show('Rating failed');
      }
    }
  }
  static updateStars(index: number): void {
    const stars = this.element.querySelectorAll('.rating__star');
    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
      }
    });
  }

  static resetStars(): void {
    const stars = this.element.querySelectorAll('.rating__star');
    stars.forEach((star) => {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    });
  }

  static updateText(index: number): void {
    const ratingText = this.element.querySelector('.rating__text');
    if (ratingText && StateManager.state.user) {
      ratingText.textContent = this.starMessages[index];
    }
  }

  static resetText(): void {
    const ratingText = this.element.querySelector('.rating__text');
    if (ratingText && StateManager.state.user) {
      ratingText.textContent = 'What do you think about this dish?';
    }
  }

  static updateScore(index: number): void {
    const ratingText = this.element.querySelector('.rating__score');
    if (ratingText) {
      ratingText.textContent = `${index + 1}/${this.numOfStars}`;
    }
  }

  static resetScore(): void {
    const ratingText = this.element.querySelector('.rating__score');
    if (ratingText) {
      ratingText.textContent = `${this.rating + 1}/${this.numOfStars}`;
    }
  }
}
