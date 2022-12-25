import React from 'react';
import { ReferralInfo } from './ReferralInfo';

export const ReferralLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div className='card'>
        <ReferralInfo />
      </div>
      ;<div className='card'>{children}</div>;
    </>
  );
};
