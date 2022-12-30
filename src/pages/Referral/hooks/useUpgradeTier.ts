import { getChainID } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { dustSmartContract } from 'apiCalls';

export const useUpgradeTier = () => {
  const upgradeTier = (): Transaction | undefined => {
    try {
      const interaction = dustSmartContract.methodsExplicit
        .updateTier()
        .withGasLimit(10_000_000)
        .withChainID(getChainID());

      return interaction.buildTransaction();
    } catch (err) {
      console.error('Unable to call useUpgradeTier transaction', err);
      return undefined;
    }
  };

  return upgradeTier;
};
