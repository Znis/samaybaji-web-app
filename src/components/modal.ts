export default class Modal {
  static toggle() {
    document.querySelector('.modal')!.innerHTML = '';
    document.body.classList.toggle('open');
  }
}
