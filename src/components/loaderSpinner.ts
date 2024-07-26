export class LoaderSpinner {
  static element = document.createElement('div');

  static render(size?: number) {
    this.element.classList.add('loading-spinner');
    this.element.style.height = `${size}px` || '10px';
    this.element.style.width = `${size}px` || '10px';
    return this.element;
  }
}
