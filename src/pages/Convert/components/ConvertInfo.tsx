import React from 'react';
import BigNumber from 'bignumber.js';
import { AccountToken } from 'types';

export interface ConvertInfoProps {
  checkedTokens: AccountToken[];
}

export const ConvertInfo = ({ checkedTokens }: ConvertInfoProps) => {
  const total = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueUsd));
  }, new BigNumber(0));

  // TODO format total

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Total USDC converted</div>
        <span className='text-main'>{total.toFixed()} USDC</span>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Protocol fee</div>
        <span className='text-main'>10%</span>
      </div>
    </div>
  );
};
