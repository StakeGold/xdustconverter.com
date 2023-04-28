import { Transaction } from '@multiversx/sdk-core/out';
import { getChainID } from '@multiversx/sdk-dapp/utils';
import { dustSmartContract } from 'apiCalls';

export const useUpgradeTier = () => {
  const displayInfo = {
    processingMessage: 'Upgrade tier',
    errorMessage: 'An error has occurred while upgrading tier',
    successMessage: 'Tier upgraded'
  };

  const upgradeTier = (): { transaction?: Transaction; displayInfo: any } => {
    try {
      const interaction = dustSmartContract.methodsExplicit
        .updateTier()
        .withGasLimit(5_000_000)
        .withChainID(getChainID());

      return {
        transaction: interaction.buildTransaction(),
        displayInfo
      };
    } catch (err) {
      console.error('Unable to call useUpgradeTier transaction', err);
      return { displayInfo };
    }
  };

  return upgradeTier;
};
