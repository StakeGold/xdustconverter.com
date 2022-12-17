import { RouteType } from '@elrondnetwork/dapp-core/types';
import { withPageTitle } from './components/PageTitle';

import { Convert, Home } from './pages';

export const routeNames = {
  home: '/',
  convert: '/convert',
  unlock: '/unlock'
};

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.convert,
    title: 'Convert',
    component: Convert,
    authenticatedRoute: true
  }
];

export const mappedRoutes = routes.map((route) => {
  const title = 'xDustConverter';

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});
