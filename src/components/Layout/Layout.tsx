import React from 'react';
import logo from 'assets/img/xdustconverter.png';
import { LinkWithQuery } from 'components';
import { ReferralNotification } from 'components/Notifications';
import { Welcome } from 'components/Welcome';
import { routeNames } from 'routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const notifications = [
    // <NoFeeNotification key='no-fee' />,
    <ReferralNotification key='referral' />
  ];

  return (
    <>
      {notifications}
      <div className='d-flex flex-column flex-fill wrapper'>
        <main className='d-flex flex-column flex-grow-1'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-12 col-lg-9 col-xl-8 mx-auto text-center my-spacer'>
                <LinkWithQuery to={routeNames.home}>
                  <h1 className='page-title'>
                    <span>xDustConverter</span>
                    <img src={logo} />
                  </h1>
                </LinkWithQuery>
                <h3 className='page-description font-weight-light text-secondary'>
                  Convert small token amounts to WEGLD
                </h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-12 col-lg-9 col-xl-8 mx-auto'>
                <Welcome />
                {children}
              </div>
            </div>
          </div>
        </main>
        <Navbar />
        <Footer />
      </div>
    </>
  );
};
