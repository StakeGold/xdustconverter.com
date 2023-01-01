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
        <ExtensionLoginButton loginButtonText='Maiar DeFi Wallet' {...props} />
        <WalletConnectLoginButton loginButtonText='Maiar App' {...props} />
        <WebWalletLoginButton loginButtonText='Elrond Web Wallet' {...props} />
        <LedgerLoginButton loginButtonText='Ledger' {...props} />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectModal;
