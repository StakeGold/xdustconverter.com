import React from 'react';
import { useGetIsLoggedIn } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { routeNames } from 'routes';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(window.location.origin);
  };

  return (
    <div className='mx-auto my-4'>
      <NavLink to={routeNames.home} className='mr-4'>
        Home
      </NavLink>
      <NavLink to={routeNames.referral}>Referral</NavLink>
    </div>
  );
};
