import { CLAIM_FEES } from 'api/mutations';
import useGetAndSendTransactions from 'utils/useGetAndSendTransactions';

export const useClaimReferralRewards = () => {
  const displayInfo = {
    processingMessage: 'Claim referral rewards',
    errorMessage: 'An error has occurred while claiming referral rewards',
    successMessage: 'referral rewards claimed '
  };

  const [claimMutation, { loading }] = useGetAndSendTransactions(
    CLAIM_FEES,
    displayInfo
  );

  const claimReferralRewards = () => {
    claimMutation({
      variables: {}
    });
  };

  return { claimReferralRewards, loading };
};
