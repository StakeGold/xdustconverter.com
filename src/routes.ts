import { RouteType } from '@elrondnetwork/dapp-core/types';
import { withPageTitle } from './components/PageTitle';

import { Convert } from './pages';

export const routeNames = {
  home: '/'
};

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
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
