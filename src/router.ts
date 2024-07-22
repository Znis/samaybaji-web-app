import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

import Cart from './pages/cart/cart';
import DishDetailLayout from './pages/dish-detail/dishDetailLayout';
import LandingPage from './pages/landing-page/landingPageLayout';
import MenuPageLayout from './pages/menu/menuPageLayout';
import Content from './app-section/content';

const routes = [
  { path: '/', action: () => LandingPage.init() },
  { path: '/cart', action: () => Cart.init() },
  { path: '/menu', action: () => MenuPageLayout.init() },
  { path: '/dish-detail', action: () => DishDetailLayout.init() },
];

const router = new UniversalRouter(routes);

export const urlGenerator = generateUrls(router);

window.addEventListener('popstate', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  Content.render(route!);
});

window.addEventListener('DOMContentLoaded', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  Content.render(route!);
});
