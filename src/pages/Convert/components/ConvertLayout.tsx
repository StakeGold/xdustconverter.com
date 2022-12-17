import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/img/xdustconverter.png';

export const ConvertLayout = ({ children }: React.PropsWithChildren) => {
  const { address } = useGetAccount();

  const handleLogout = () => {
    logout(window.location.origin);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-10 col-lg-8 mx-auto text-center my-spacer'>
          <h1 className='page-title'>
            <span>xDustConverter</span>
            <img src={logo} />
          </h1>
          <h3 className='page-description font-weight-light text-secondary'>
            Convert small ESDT amounts to WEGLD
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-10 col-lg-8 mx-auto'>
          <div className='card welcome-card mb-4'>
            <h3>
              Welcome, <br />
              <span>{address}</span>!
            </h3>
            <button
              className='btn btn-secondary btn-logout'
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </div>
          <div className='card'>{children}</div>
        </div>
      </div>
    </div>
  );
};
