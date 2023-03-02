import React from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { ExplorerLink } from '@multiversx/sdk-dapp/UI';
import { logout } from '@multiversx/sdk-dapp/utils';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Welcome = () => {
  const { address, username } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const handleLogout = () => {
    logout(window.location.href);
  };

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div className='card welcome-card mb-4'>
      <h3>
        Welcome, <br />
        <ExplorerLink
          page={`/accounts/${address}`}
          text={username ?? address}
        />
        !
      </h3>
      <button className='btn btn-secondary btn-logout' onClick={handleLogout}>
        <FontAwesomeIcon icon={faPowerOff} />
      </button>
    </div>
  );
};
