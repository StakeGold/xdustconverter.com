import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { NavLink } from 'react-router-dom';
import { routeNames } from 'routes';

const ReferralNotification = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  return (
    <>
      {isLoggedIn && (
        <div className='d-flex flex-column justify-content-center align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold text-center'>
          <NavLink
            to={routeNames.referral}
            style={{
              color: '#000'
            }}
          >
            Refer a friend 🚀
          </NavLink>
        </div>
      )}
    </>
  );
};

export default ReferralNotification;
