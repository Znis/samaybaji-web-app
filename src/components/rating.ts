import { fetchTargetRatings } from '../api-routes/rating';
import { StateManager } from './../state-management/stateManager';
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
  static init(dishId: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('rating');
          this.html = html;
          this.fetchRating(dishId);
        });
    }
    return this.element;
  }
  static async fetchRating(dishId: string) {
    this.element.innerHTML = this.html;
    const rating = (await fetchTargetRatings(dishId)) as unknown as {
      count: number;
      rating: number;
    };
    this.rating = rating.rating || 0;
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
    ratingsCount.innerHTML = `${this.ratingCount} reviews`
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
      });
    });
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
    if (ratingText && StateManager.state.user) {
      ratingText.textContent = `${index + 1}/${this.numOfStars}`;
    }
  }

  static resetScore(): void {
    const ratingText = this.element.querySelector('.rating__score');
    if (ratingText && StateManager.state.user) {
      ratingText.textContent = `${this.rating}/${this.numOfStars}`;
    }
  }
}
