import React from 'react';
import { ReferralInfo } from './ReferralInfo';

export const ReferralLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ReferralInfo />
    </>
  );
};
