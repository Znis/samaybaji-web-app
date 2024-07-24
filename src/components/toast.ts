import Toastify from 'toastify-js';

export default class Toast {
  static style = {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1rem 2rem',
    background: 'var(--brown)',
    borderRadius: '1rem',
    bottom: '5vh',
    right: '2vw',
    zIndex: '10',
    color: 'white',
    minWidth: '14rem',
  };
  static durationMS = 5000;
  static show(message: string) {
    return Toastify({
      text: message,
      duration: this.durationMS,
      newWindow: true,
      close: true,
      gravity: 'bottom',
      stopOnFocus: true,
      style: this.style,
    }).showToast();
  }
}
