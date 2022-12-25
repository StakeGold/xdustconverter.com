import React, { useMemo, useState } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { sendAndSignTransactions } from 'apiCalls';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';
import { useRegisterReferralTag } from '../hooks';

export const ReferralRegister = () => {
  const registerReferralTag = useRegisterReferralTag();

  const [tag, setTag] = useState('');

  const isDisabled = useMemo(() => {
    return tag.length === 0;
  }, [tag]);

  const { pending } = useGetActiveTransactionsStatus();

  const processRegisterTagTransaction = async (
    transaction: Transaction | undefined
  ) => {
    try {
      if (transaction === undefined) {
        return;
      }

      const displayInfo = {
        processingMessage: 'Registering referral tag',
        errorMessage: 'An error has occurred while registering referral tag',
        successMessage: 'The referral tag has been registered successfully'
      };
      await sendAndSignTransactions([transaction], displayInfo);
    } catch (err: any) {
      console.log('processRegisterTagTransaction error', err);
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    const transaction = registerReferralTag(tag);
    processRegisterTagTransaction(transaction);
  };

  const InfoTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            <p>
              Create your own referral tag by setting a unique descriptive name
              for your tag.
            </p>
          </Tooltip>
        )}
      >
        <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
      </OverlayTrigger>
    );
  };

  const FeeTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            {/* TODO */}
            <p> </p>
          </Tooltip>
        )}
      >
        <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
      </OverlayTrigger>
    );
  };

  return (
    <div className='card mb-4'>
      <h4 className='mb-4'>
        Create referral tag <InfoTooltip />
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
        Referral rewards percent: 5% <FeeTooltip />
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
  );
};
