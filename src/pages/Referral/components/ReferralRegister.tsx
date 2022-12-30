import React, { useMemo, useState } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { sendAndSignTransactions } from 'apiCalls';
import { TierDetails } from 'types';
import { useRegisterReferralTag } from '../hooks';
import { InfoTooltip } from './InfoTooltip';
import { ReferralRewardsPercentTooltip } from './ReferralRewardsPercentTooltip';
import { ReferralTiers } from './ReferralTiers';

interface ReferralRegisterProps {
  tiers: TierDetails[];
}

export const ReferralRegister = ({ tiers }: ReferralRegisterProps) => {
  const registerReferralTag = useRegisterReferralTag();

  const location = useLocation();
  const callbackRoute = `${location.pathname}${location.search}`;

  const [tag, setTag] = useState('');

  const isDisabled = useMemo(() => {
    return tag.length === 0;
  }, [tag]);

  const { pending } = useGetActiveTransactionsStatus();

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const { transaction, displayInfo } = registerReferralTag(tag);
      if (!transaction) {
        return;
      }

      await sendAndSignTransactions([transaction], displayInfo, callbackRoute);
    } catch (err: any) {
      console.log('processRegisterTagTransaction error', err);
    }
  };

  return (
    <>
      <ReferralTiers tiers={tiers} />
      <div className='card mb-4'>
        <h4 className='mb-4'>
          Create referral tag{' '}
          <InfoTooltip>
            <p>
              Create your own referral tag by setting a unique descriptive name
              for your tag.
            </p>
          </InfoTooltip>
        </h4>
        <div className='mb-4'>
          <label>Referral tag</label>
          <input
            className='referral-tag-input'
            type='text'
            placeholder='Referral tag..'
            value={tag}
            disabled={pending}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label>
            Default referral rewards percent <ReferralRewardsPercentTooltip />
          </label>
          <div className='referral-tag-input disabled'>5%</div>
        </div>
        <button
          className='btn btn-primary btn-connect'
          onClick={(e) => handleSubmit(e)}
          disabled={pending || isDisabled}
        >
          {pending ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : (
            'Create referral tag'
          )}
        </button>
      </div>
    </>
  );
};
