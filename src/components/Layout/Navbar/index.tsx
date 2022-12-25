import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { NavLink } from 'react-router-dom';
import { routeNames } from 'routes';

export const Navbar = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div className='mx-auto my-4'>
      <NavLink to={routeNames.home}>Home</NavLink>
      <span className='text-primary mx-3'>•</span>
      <NavLink to={routeNames.referral}>Referral</NavLink>
    </div>
  );
};
