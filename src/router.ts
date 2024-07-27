import UniversalRouter from 'universal-router';

import Cart from './pages/cart/cart';
import DishDetailLayout from './pages/dish-detail/dishDetailLayout';
import LandingPage from './pages/landing-page/landingPageLayout';
import MenuPageLayout from './pages/menu/menuPageLayout';
import Content from './app-section/content';
import ErrorPage from './pages/error-page/errorPage';
import Checkout from './pages/checkout-page/checkout';

export interface RouterContext {
  [propName: string]: {
    [propName: string]: string;
  };
}

const routes = [
  { path: '/', action: () => LandingPage.init() },
  { path: '/cart', action: () => Cart.init() },
  { path: '/menu', action: () => MenuPageLayout.init() },
  { path: '/checkout', action: () => Checkout.init() },
  {
    path: '/dishdetail/:id',
    action: (context: RouterContext) =>
      DishDetailLayout.init(context.params.id),
  },
  { path: '(.*)', action: () => ErrorPage.init() },
];

const router = new UniversalRouter(routes);

export const navigate = async (link: string) => {
  const route = await router.resolve({ pathname: link });
  if (route) Content.render(route);
};

window.addEventListener('popstate', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  if (route) Content.render(route);
});

window.addEventListener('DOMContentLoaded', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  if (route) Content.render(route);
});
