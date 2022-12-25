import { getChainID } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { dustSmartContract } from 'apiCalls';

export const useClaimReferralRewards = () => {
  const claimReferralRewards = (): Transaction | undefined => {
    try {
      const interaction = dustSmartContract.methodsExplicit
        .claimReferralFees()
        .withGasLimit(10_000_000)
        .withChainID(getChainID());

      return interaction.buildTransaction();
    } catch (err) {
      console.error('Unable to call claimReferralRewards transaction', err);
      return undefined;
    }
  };

  return claimReferralRewards;
};
