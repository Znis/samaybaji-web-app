import { StateManager } from './state-management/stateManager';
import UniversalRouter from 'universal-router';

import Cart from './pages/cart/cart';
import DishDetailLayout from './pages/dish-detail/dishDetailLayout';
import LandingPage from './pages/landing-page/landingPageLayout';
import MenuPageLayout from './pages/menu/menuPageLayout';
import Content from './app-section/content';
import ErrorPage from './pages/error-page/errorPage';
import Checkout from './pages/checkout-page/checkout';
import DashboardLayout from './pages/dashboard/layout';
import AppLayout from './appLayout';
import AdminLogin from './pages/admin/adminLogin';
import { Roles } from './enums/roles';

export interface RouterContext {
  [propName: string]: {
    [propName: string]: string;
  };
}
const adminRoute = [
  {
    path: '/admin',
    action: () => AdminLogin.init(),
  },
];
const routes = [
  { path: '/', action: () => LandingPage.init() },
  { path: '/cart', action: () => Cart.init() },
  { path: '/menu', action: () => MenuPageLayout.init() },
  {
    path: '/dashboard',
    action: () => {
      if (StateManager.state.user) {
        return DashboardLayout.init('customer');
      } else {
        return ErrorPage.init();
      }
    },
  },
  {
    path: '/restaurant/dashboard',
    action: () => {
      if (!StateManager.state.user) {
        return ErrorPage.init();
      }
      if (StateManager.state.user!.roleId == Roles.CUSTOMER_WITH_RESTAURANT) {
        StateManager.updateState('cart', []);
        return DashboardLayout.init('restaurant');
      } else {
        return ErrorPage.init();
      }
    },
  },
  {
    path: '/checkout',
    action: () => {
      if (StateManager.state.user && StateManager.state.cart.length) {
        return Checkout.init();
      } else {
        ErrorPage.init();
      }
    },
  },
  {
    path: '/dish-detail/:id',
    action: (context: RouterContext) =>
      DishDetailLayout.init(context.params.id),
  },
  { path: '(.*)', action: () => ErrorPage.init() },
];

const adminRouter = new UniversalRouter(adminRoute);
const router = new UniversalRouter(routes);

export const navigate = async (link: string) => {
  const route = await router.resolve({ pathname: link });
  if (route) Content.render(route);
};

window.addEventListener('popstate', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  if (route) Content.render(route);
  try {
    const adminRoute = await adminRouter.resolve({
      pathname: window.location.pathname,
    });
    if (adminRoute) {
      AppLayout.initAdmin(adminRoute);
      StateManager.resetState();
      return;
    }
  } catch (error) {
    console.log('Not an admin route');
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const route = await router.resolve({ pathname: window.location.pathname });
  if (route) Content.render(route);
  try {
    const adminRoute = await adminRouter.resolve({
      pathname: window.location.pathname,
    });
    if (adminRoute) {
      AppLayout.initAdmin(adminRoute);
      StateManager.resetState();
      return;
    }
  } catch (error) {
    console.log('Not an admin route');
  }
});
