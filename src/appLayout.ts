export default class AppLayout {
  static render(): void {
    const appElement: HTMLElement | null = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML = `
            <div class="background" id="modal-background"></div>
            <div class="modal"></div>
            <header></header>
            <div class="content"></div>
            <footer></footer>
        `;
    }
  }
}
