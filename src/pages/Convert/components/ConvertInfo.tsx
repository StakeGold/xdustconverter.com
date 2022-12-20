import React from 'react';
import BigNumber from 'bignumber.js';
import { ValueWithTooltip } from 'components';
import { AccountToken } from 'types';

export interface ConvertInfoProps {
  checkedTokens: AccountToken[];
  protocolFee: number;
}

export const ConvertInfo = ({
  checkedTokens,
  protocolFee
}: ConvertInfoProps) => {
  const totalWegld = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueWegld));
  }, new BigNumber(0));
  const totalWegldWithFee = totalWegld.minus(
    new BigNumber(protocolFee / 100).multipliedBy(totalWegld)
  );
  const formattedTotalWegld = totalWegldWithFee.decimalPlaces(6).toFixed();

  const totalUsd = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueUsd));
  }, new BigNumber(0));
  const formattedTotalUsd = totalUsd.decimalPlaces(2).toFixed();

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Total WEGLD converted</div>
        <div className='d-flex flex-column'>
          <span className='text-main'>
            <ValueWithTooltip
              formattedValue={formattedTotalWegld}
              value={totalWegldWithFee.toFixed()}
            />{' '}
            WEGLD
          </span>
          <small className='text-secondary text-right'>
            ≈ ${formattedTotalUsd}
          </small>
        </div>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Protocol fee</div>
        <span className='text-main'>{protocolFee}%</span>
      </div>
    </div>
  );
};
