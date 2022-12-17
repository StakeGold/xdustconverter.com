import React, { ReactNode, useState } from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { faZap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConnectModal from './ConnectModal';

interface ActionOrConnectProps {
  children: ReactNode;
}

const ActionOrConnect = ({ children }: ActionOrConnectProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (event: React.MouseEvent<HTMLElement>) => {
    setShowModal(true);
    event.stopPropagation();
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {isLoggedIn ? (
        <>{children}</>
      ) : (
        <a
          className='btn btn-primary btn-connect'
          onClick={(event) => handleShowModal(event)}
        >
          <FontAwesomeIcon icon={faZap} className='mx-2' />
          Connect
        </a>
      )}

      <ConnectModal show={showModal} onHide={handleCloseModal} />
    </>
  );
};

export default ActionOrConnect;
