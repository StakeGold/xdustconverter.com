import { UPDATE_TIER } from 'api/mutations';
import useGetAndSendTransactions from 'utils/useGetAndSendTransactions';

export const useUpgradeTier = () => {
  const displayInfo = {
    processingMessage: 'Upgrade tier',
    errorMessage: 'An error has occurred while upgrading tier',
    successMessage: 'Tier upgraded'
  };

  const [mutateTier, loading] = useGetAndSendTransactions(
    UPDATE_TIER,
    displayInfo
  );

  const upgradeTier = () => {
    mutateTier({
      variables: {}
    });
  };

  return { upgradeTier, loading };
};
