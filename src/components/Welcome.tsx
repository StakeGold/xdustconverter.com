import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { ExplorerLink } from '@elrondnetwork/dapp-core/UI';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Welcome = () => {
  const { address, username } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const handleLogout = () => {
    logout(window.location.origin);
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
