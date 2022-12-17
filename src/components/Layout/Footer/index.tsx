import React from 'react';
import { useGetVersion } from '@buidly/dapp-core/dist/hooks';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

export const Footer = () => {
  const buildVersion = useGetVersion();

  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://stakegold.com'
        >
          Made with <HeartIcon className='mx-1' /> by StakeGold.
        </a>
        <small>Build {buildVersion ?? '-'}</small>
      </div>
    </footer>
  );
};
