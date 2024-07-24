export class LoaderSpinner {
  static element = document.createElement('div');

  static render() {
    this.element.classList.add('loading-spinner');
    return this.element;
  }
}
