import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { LinkWithQuery } from 'components';
import { routeNames } from 'routes';

export const Navbar = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div className='mx-auto my-4'>
      <LinkWithQuery to={routeNames.home}>Home</LinkWithQuery>
      <span className='text-primary mx-3'>•</span>
      <LinkWithQuery to={routeNames.referral}>Referral</LinkWithQuery>
    </div>
  );
};
