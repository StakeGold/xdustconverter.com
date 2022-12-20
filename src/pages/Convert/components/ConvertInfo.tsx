import React from 'react';
import BigNumber from 'bignumber.js';
import { ValueWithTooltip } from 'components';
import { SLIPPAGE } from 'config';

export interface ConvertInfoProps {
  totalWegld: BigNumber;
  totalUsd: BigNumber;
  protocolFee: number;
}

export const ConvertInfo = ({
  totalWegld,
  totalUsd,
  protocolFee
}: ConvertInfoProps) => {
  const formattedTotalWegld = totalWegld
    .decimalPlaces(6, BigNumber.ROUND_DOWN)
    .toFixed();
  const formattedTotalUsd = totalUsd.decimalPlaces(2).toFixed();

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Minimum converted</div>
        <div className='d-flex flex-column'>
          <span className='text-main'>
            <ValueWithTooltip
              formattedValue={formattedTotalWegld}
              value={totalWegld.toFixed()}
            />{' '}
            WEGLD
          </span>
          {/* <small className='text-secondary text-right'>
            ≈ ${formattedTotalUsd}
          </small> */}
        </div>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Protocol fee</div>
        <span className='text-main'>{protocolFee}%</span>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Slippage</div>
        <span className='text-main'>{SLIPPAGE * 100}%</span>
      </div>
    </div>
  );
};
