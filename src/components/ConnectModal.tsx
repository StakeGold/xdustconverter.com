import React, { useEffect } from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from '@elrondnetwork/dapp-core/UI';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';

interface ConnectModalProps {
  show: boolean;
  onHide: () => void;
}

const ConnectModal = ({ show, onHide }: ConnectModalProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  useEffect(() => {
    if (isLoggedIn) {
      onHide();
    }
  }, [isLoggedIn]);

  return (
    <Modal show={show} onHide={onHide} className='login-modal'>
      <Modal.Header>
        <Modal.Title>Connect to a wallet</Modal.Title>
        <span className='btn btn-close' onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <ExtensionLoginButton
          callbackRoute={'/'}
          loginButtonText='Maiar DeFi Wallet'
          nativeAuth={true}
        />
        <WalletConnectLoginButton
          callbackRoute={'/'}
          loginButtonText='Maiar App'
          nativeAuth={true}
        />
        <WebWalletLoginButton
          callbackRoute={'/'}
          loginButtonText='Elrond Web Wallet'
          nativeAuth={true}
        />
        <LedgerLoginButton
          callbackRoute={'/'}
          loginButtonText='Ledger'
          nativeAuth={true}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectModal;
