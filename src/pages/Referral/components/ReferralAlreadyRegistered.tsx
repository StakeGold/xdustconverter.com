import React from 'react';

export interface ReferralAlreadyRegisteredProps {
  userTag: string;
}

export const ReferralAlreadyRegistered = ({
  userTag
}: ReferralAlreadyRegisteredProps) => {
  // TODO show link and tak
  // TODO show claim modal
  return (
    <div>
      <h4>Already Registered</h4>
      <p>tag: {userTag}</p>
    </div>
  );
};
