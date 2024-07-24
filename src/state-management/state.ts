import { ICartData, ICartItemData } from './../interfaces/cart';
// Global state object
interface AppState {
  user: { id: number; name: string; email: string; phoneNumber: string } | null;
  cart: ICartItemData[];
}

const state: AppState = {
  user: null,
  cart: [],
};

// Function to update the state
function updateState<K extends keyof AppState>(key: K, value: AppState[K]) {
  state[key] = value;
  render(); // Call the render function to update the UI
}

// Render function to update the UI based on the state
function render() {
  // Example: Update user greeting
  const userGreeting = document.getElementById('userGreeting');
  if (userGreeting && state.user) {
    userGreeting.textContent = `Hello, ${state.user.name}`;
  }

  // Example: Update cart display
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = state.cart.items.length.toString();
  }

  // Add other UI updates as needed
}

// Example usage
updateState('user', { id: 1, name: 'John Doe' });
updateState('cart', {
  items: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
});
