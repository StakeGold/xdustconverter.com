import { useMutation } from '@apollo/client';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { REGISTER_REFERRAL } from 'api/mutations';

export const useRegisterReferralTag = () => {
  const [mutate, { data, error }] = useMutation(REGISTER_REFERRAL);

  const registerReferralTag = (
    tag: string
  ): { transaction?: Transaction; displayInfo: any } => {
    const displayInfo = {
      processingMessage: 'Registering referral tag',
      errorMessage: 'An error has occurred while registering referral tag',
      successMessage: 'The referral tag has been registered successfully'
    };

    if (data != null) {
      return (
        mutate({
          variables: {
            tag
          }
        }),
        { displayInfo }
      );
    } else {
      console.error('Unable to call registerReferralTag transaction', error);
      return { displayInfo };
    }
  };

  return registerReferralTag;
};
