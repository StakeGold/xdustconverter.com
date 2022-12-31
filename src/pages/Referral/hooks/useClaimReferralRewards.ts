import { getChainID } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { dustSmartContract } from 'apiCalls';

export const useClaimReferralRewards = () => {
  const displayInfo = {
    processingMessage: 'Claim referral rewards',
    errorMessage: 'An error has occurred while claiming referral rewards',
    successMessage: 'referral rewards claimed '
  };

  const claimReferralRewards = (): {
    transaction?: Transaction;
    displayInfo: any;
  } => {
    try {
      const interaction = dustSmartContract.methodsExplicit
        .claimReferralFees()
        .withGasLimit(10_000_000)
        .withChainID(getChainID());

      return {
        transaction: interaction.buildTransaction(),
        displayInfo
      };
    } catch (err) {
      console.error('Unable to call claimReferralRewards transaction', err);
      return { displayInfo };
    }
  };

  return claimReferralRewards;
};
