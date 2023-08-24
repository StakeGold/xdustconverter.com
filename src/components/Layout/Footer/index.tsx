import React from 'react';
import { useGetVersion } from '@buidly/dapp-core/dist/hooks';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/img/telegram.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/twitter.svg';

export const Footer = () => {
  const buildVersion = useGetVersion();

  return (
    <footer className='footer text-center'>
      <a
        target={'_blank'}
        className='d-flex align-items-center mb-2'
        // href='https://buidly.com'
        rel='noreferrer'
      >
        Made with <HeartIcon className='mx-1' /> on MultiversX
      </a>
      <div className='social mb-2'>
        <a
          target={'_blank'}
          href='https://t.me/xDustConverter'
          rel='noreferrer'
          className='mr-2'
        >
          <TelegramIcon />
        </a>
        <a
          target={'_blank'}
          href='https://twitter.com/Buidly_'
          rel='noreferrer'
        >
          <TwitterIcon />
        </a>
      </div>
      <small className='app-version'>Build {buildVersion ?? '-'}</small>
    </footer>
  );
};
