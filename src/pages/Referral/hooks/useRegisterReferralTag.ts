import { BytesValue, Transaction } from '@multiversx/sdk-core/out';
import { getChainID } from '@multiversx/sdk-dapp/utils';
import { dustSmartContract } from 'apiCalls';

export const useRegisterReferralTag = () => {
  const registerReferralTag = (
    tag: string
  ): { transaction?: Transaction; displayInfo: any } => {
    const displayInfo = {
      processingMessage: 'Registering referral tag',
      errorMessage: 'An error has occurred while registering referral tag',
      successMessage: 'The referral tag has been registered successfully'
    };

    try {
      const interaction = dustSmartContract.methodsExplicit
        .registerReferralTag([new BytesValue(Buffer.from(tag, 'utf-8'))])
        .withGasLimit(5_000_000)
        .withChainID(getChainID());

      return {
        transaction: interaction.buildTransaction(),
        displayInfo
      };
    } catch (error) {
      console.error('Unable to call registerReferralTag transaction', error);
      return { displayInfo };
    }
  };

  return registerReferralTag;
};
