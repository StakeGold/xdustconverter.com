import { useMutation } from '@apollo/client';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { CLAIM_FEES } from 'api/mutations';

export const useClaimReferralRewards = () => {
  const [mutate, { data, error }] = useMutation(CLAIM_FEES);

  const claimReferralRewards = (): {
    transaction?: Transaction;
    displayInfo: any;
  } => {
    const displayInfo = {
      processingMessage: 'Claim referral rewards',
      errorMessage: 'An error has occurred while claiming referral rewards',
      successMessage: 'referral rewards claimed '
    };

    if (data != null) {
      return mutate(), { displayInfo };
    } else {
      console.error('Unable to call claimReferralRewards transaction', error);
      return { displayInfo };
    }
  };

  return claimReferralRewards;
};
