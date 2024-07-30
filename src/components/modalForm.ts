export class ModalForm {
  static element = document.createElement('div');

  static init(formContent: {
    element: HTMLElement;
    setupEventListeners: () => void;
  }): HTMLElement {
    this.element.classList.add('modal-form');
    this.element.appendChild(formContent.element);
    formContent.setupEventListeners();
    return this.element;
  }
}
