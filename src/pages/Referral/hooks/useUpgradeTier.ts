import { useMutation } from '@apollo/client';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { UPDATE_TIER } from 'api/mutations';

export const useUpgradeTier = () => {
  const [mutate, { data, error }] = useMutation(UPDATE_TIER);

  const upgradeTier = (): {
    transaction?: Transaction;
    displayInfo: any;
  } => {
    const displayInfo = {
      processingMessage: 'Upgrade tier',
      errorMessage: 'An error has occurred while upgrading tier',
      successMessage: 'Tier upgraded'
    };

    if (data != null) {
      return mutate(), { displayInfo };
    } else {
      console.error('Unable to call useUpgradeTier transaction', error);
      return { displayInfo };
    }
  };

  return upgradeTier;
};
