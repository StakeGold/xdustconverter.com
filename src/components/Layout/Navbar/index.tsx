import React from 'react';
import { LinkWithQuery } from 'components';
import { routeNames } from 'routes';

export const Navbar = () => {
  return (
    <div className='mx-auto my-4'>
      <LinkWithQuery to={routeNames.home}>Home</LinkWithQuery>
      <span className='text-primary mx-3'>•</span>
      <LinkWithQuery to={routeNames.referral}>Referral</LinkWithQuery>
    </div>
  );
};
