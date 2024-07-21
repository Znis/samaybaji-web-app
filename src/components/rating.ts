export default class Rating {
  static htmlTemplateURL: string = './assets/templates/components/rating.html';
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
  static selectedIndex: number = -1;
  static init(rating: number): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('rating');
          this.element.innerHTML = html;
          this.appendStars();
          this.setupEventListeners();
        });
    }
    this.rating = rating;
    return this.element;
  }

  static appendStars(): void {
    const starsWrapper = this.element.querySelector(
      '.rating__stars-wrapper',
    ) as HTMLDivElement;

    for (let i = 0; i < this.numOfStars; i++) {
      const starElement = document.createElement('i');
      starElement.classList.add('fa-regular', 'fa-star', 'rating__star');
      starElement.setAttribute('data-value', (i + 1).toString());
      starsWrapper.appendChild(starElement);
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
        this.persistRating(index);
        this.updateStars(index);
        this.updateText(index);
        this.updateScore(index);
      });
    });
    const persistedRating = this.getPersistedRating();
    if (persistedRating !== null) {
      this.selectedIndex = persistedRating;
      this.updateStars(persistedRating);
      this.updateText(persistedRating);
      this.updateScore(persistedRating);
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
    if (ratingText) {
      ratingText.textContent = this.starMessages[index];
    }
  }

  static resetText(): void {
    const ratingText = this.element.querySelector('.rating__text');
    if (ratingText) {
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
      ratingText.textContent = `${this.rating}/${this.numOfStars}`;
    }
  }
  static persistRating(index: number): void {
    localStorage.setItem('selectedRating', index.toString());
  }

  static getPersistedRating(): number | null {
    const rating = localStorage.getItem('selectedRating');
    return rating !== null ? parseInt(rating, 10) : null;
  }
}
