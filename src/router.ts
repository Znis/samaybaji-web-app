import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

import Cart from './pages/cart/cart';
import DishDetailLayout from './pages/dish-detail/dishDetailLayout';
import LandingPage from './pages/landing-page/landingPageLayout';
import MenuPageLayout from './pages/menu/menuPageLayout';
import Content from './app-section/content';
import ErrorPage from './pages/error-page/errorPage';

const routes = [
  { path: '/', action: () => LandingPage.init() },
  { path: '/cart', action: () => Cart.init() },
  { path: '/menu', action: () => MenuPageLayout.init() },
  { path: '/dish-detail', action: () => DishDetailLayout.init() },
  { path: '/error', action: () => ErrorPage.init() },
];

const router = new UniversalRouter(routes);

export const urlGenerator = generateUrls(router);

window.addEventListener('popstate', async () => {
  try {
    const route = await router.resolve({ pathname: window.location.pathname });
    if (route) Content.render(route);
  } catch {
    const errorRoute = await router.resolve({ pathname: '/error' });
    if (errorRoute) Content.render(errorRoute);
    window.history.pushState({}, '', '/error');
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const route = await router.resolve({ pathname: window.location.pathname });
    if (route) Content.render(route);
  } catch {
    const errorRoute = await router.resolve({ pathname: '/error' });
    if (errorRoute) Content.render(errorRoute);
    window.history.pushState({}, '', '/error');
  }
});
