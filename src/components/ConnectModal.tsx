import React, { useEffect } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from '@multiversx/sdk-dapp/UI';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();

  const props = {
    callbackRoute: location.pathname,
    nativeAuth: true
  };

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
          loginButtonText='MultiversX DeFi Wallet'
          {...props}
        />
        <WalletConnectLoginButton loginButtonText='xPortal App' {...props} />
        <WebWalletLoginButton
          loginButtonText='MultiversX Web Wallet'
          isWalletConnectV2={true}
          {...props}
        />
        <LedgerLoginButton loginButtonText='Ledger' {...props} />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectModal;
