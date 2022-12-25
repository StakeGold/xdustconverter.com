import React from 'react';
import { ReferralNotification } from 'components/Notifications';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const notifications = [
    // <NoFeeNotification key='no-fee' />,
    <ReferralNotification key='referral' />
  ];

  return (
    <>
      {notifications}
      <div className='d-flex flex-column flex-fill wrapper'>
        <main className='d-flex flex-column flex-grow-1'>{children}</main>
        <Footer />
      </div>
    </>
  );
};
