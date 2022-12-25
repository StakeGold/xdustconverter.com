import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeNames } from 'routes';

export const Navbar = () => {
  return (
    <div className='mx-auto my-4'>
      <NavLink to={routeNames.home}>Home</NavLink>
      <span className='text-primary mx-3'>•</span>
      <NavLink to={routeNames.referral}>Referral</NavLink>
    </div>
  );
};
