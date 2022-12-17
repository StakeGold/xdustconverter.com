import axios from 'axios';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWhitelistedTokens } from './getWhitelistedTokens';

export const getWhitelistedDashboardTokens = async (
  apiAddress: string
): Promise<AccountToken[]> => {
  const tokenIdentifiers = await getWhitelistedTokens();
  const tokenIdentifierChunks = sliceIntoChunks(tokenIdentifiers, 25);

  const tokensRaw = await Promise.all(
    tokenIdentifierChunks.map(async (identifiers) => {
      const { data } = await axios.get(`${apiAddress}/tokens`, {
        params: {
          identifiers: identifiers.join()
        }
      });

      return data as AccountToken[];
    })
  );
  const tokens = tokensRaw.flat().map((token) => ({
    ...token,
    balance: '0',
    valueUsd: 0
  }));

  return tokens;
};
