import { Convert, Referral } from 'pages';

export const routeNames = {
  home: '/',
  referral: '/referral'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    component: Convert
  },
  {
    path: routeNames.referral,
    title: 'Referral',
    component: Referral,
    authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const requiresAuth = Boolean(route.authenticatedRoute);

  return {
    path: route.path,
    component: route.component,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
