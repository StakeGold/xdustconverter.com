import React from 'react';
import { useGetVersion } from '@buidly/dapp-core/dist/hooks';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/img/telegram.svg';

export const Footer = () => {
  const buildVersion = useGetVersion();

  return (
    <footer className='footer text-center'>
      <a
        target={'_blank'}
        className='d-flex align-items-center mb-2'
        href='https://stakegold.com'
        rel='noreferrer'
      >
        Made with <HeartIcon className='mx-1' /> by StakeGold team.
      </a>
      <div className='social mb-2'>
        <a target={'_blank'} href='https://telegram.org' rel='noreferrer'>
          <TelegramIcon />
        </a>
      </div>
      <small className='app-version'>Build {buildVersion ?? '-'}</small>
    </footer>
  );
};
