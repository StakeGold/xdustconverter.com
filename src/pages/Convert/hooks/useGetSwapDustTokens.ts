import { SWAP_TOKENS } from 'api/mutations';
import { AccountToken } from 'types';
import useGetAndSendTransactions from 'utils/useGetAndSendTransactions';
import { TokenArgs } from '../../../types/SwapDustTokenArgs';

export const useGetSwapDustTokens = () => {
  const displayInfo = {
    processingMessage: 'Converting small amounts',
    errorMessage: 'An error has occurred while converting small amounts',
    successMessage: 'Converting small amounts succeeded'
  };

  const [mutate, { loading }] = useGetAndSendTransactions(
    SWAP_TOKENS,
    displayInfo
  );

  const swapDustTokens = (
    totalWegld: string,
    tokens: AccountToken[],
    referralTag: string | null
  ) => {
    mutate({
      variables: {
        input: {
          totalWegld,
          tokens: tokens.map((token: AccountToken) => {
            return {
              identifier: token.identifier,
              amount: token.balance
            } as TokenArgs;
          }),
          referralTag
        }
      }
    });
  };

  return { swapDustTokens, loading };
};
