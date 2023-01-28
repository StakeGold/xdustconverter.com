import { REGISTER_REFERRAL } from 'api/mutations';
import useGetAndSendTransactions from 'utils/useGetAndSendTransactions';

export const useRegisterReferralTag = () => {
  const displayInfo = {
    processingMessage: 'Registering referral tag',
    errorMessage: 'An error has occurred while registering referral tag',
    successMessage: 'The referral tag has been registered successfully'
  };

  const [mutate, { loading }] = useGetAndSendTransactions(
    REGISTER_REFERRAL,
    displayInfo
  );

  const registerReferralTag = (tag: string) => {
    mutate({
      variables: {
        tag
      }
    });
  };

  return { registerReferralTag, loading };
};
