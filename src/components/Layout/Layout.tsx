import React, { useEffect } from 'react';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { Loader, PageState } from '@multiversx/sdk-dapp/UI';
import { useSearchParams } from 'react-router-dom';
import logo from 'assets/img/logo.png';
import { LinkWithQuery } from 'components';
import { Welcome } from 'components/Welcome';
import { useGetContractState } from 'pages/Convert/hooks';
import { routeNames } from 'routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const referralTag = searchParams.get('referral');
  const contractState = useGetContractState();

  const notifications: JSX.Element[] = [
    // <NoFeeNotification key='no-fee' />,
    // <ReferralNotification key='referral' />
  ];

  useEffect(() => {
    if (referralTag) {
      localStorage.setItem('xdc_ref', referralTag);
    }
  }, [referralTag]);

  let pageComponent = children;
  if (contractState === undefined) {
    pageComponent = (
      <div className='card'>
        <Loader />
      </div>
    );
  }

  if (contractState === 'Inactive') {
    pageComponent = (
      <div className='card'>
        <PageState
          icon={faSadTear}
          className='text-muted'
          title='xDustConverter is under maintenance'
        />
      </div>
    );
  }

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
                <h3 className='page-description font-weight-light text-secondary d-none'>
                  Convert small token amounts
                </h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-12 col-lg-9 col-xl-8 mx-auto'>
                <Welcome />
                {pageComponent}
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
