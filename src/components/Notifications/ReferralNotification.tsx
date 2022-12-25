import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { NavLink, useLocation } from 'react-router-dom';
import { routeNames } from 'routes';

const ReferralNotification = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const location = useLocation();
  const isReferralPage = location.pathname === routeNames.referral;

  return (
    <>
      {isLoggedIn && !isReferralPage && (
        <div className='d-flex flex-column justify-content-center align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold text-center'>
          <NavLink
            to={routeNames.referral}
            style={{
              color: '#000'
            }}
            target='_blank'
          >
            Refer a friend 🚀
          </NavLink>
        </div>
      )}
    </>
  );
};

export default ReferralNotification;
