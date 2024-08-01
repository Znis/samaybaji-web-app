export class Accordion {
  element: HTMLElement;
  content: {
    element: HTMLDivElement;
    eventListeners: (element: HTMLDivElement) => void;
  };
  heading: {
    element: HTMLDivElement;
    eventListeners: (element: HTMLDivElement, id: string) => void;
    id: string;
  };
  constructor(
    content: {
      element: HTMLDivElement;
      eventListeners: (element: HTMLDivElement) => void;
    },
    heading: {
      element: HTMLDivElement;
      eventListeners: (element: HTMLDivElement, id: string) => void;
      id: string;
    },
  ) {
    this.element = document.createElement('div');
    this.content = content;
    this.heading = heading;
    this.init();
  }

  init() {
    this.element.classList.add('accordion-item');
    this.element.appendChild(this.heading.element);
    this.element.appendChild(this.content.element);

    this.renderAccordion();
    this.setEventListeners();
    return this.element;
  }
  renderAccordion(): void {
    const accordionHeader = this.element.querySelector(
      '.accordion-header',
    ) as HTMLDivElement;
    const accordionItem = accordionHeader.parentElement;
    const accordionContent = accordionItem!.querySelector(
      '.accordion-content',
    ) as HTMLDivElement;
    accordionHeader.addEventListener('click', () => {
      accordionHeader.classList.toggle('active');
      accordionContent.classList.toggle('open');
    });
  }
  setEventListeners() {
    this.heading.eventListeners(this.heading.element, this.heading.id);
    this.content.eventListeners(this.content.element);
  }
}
