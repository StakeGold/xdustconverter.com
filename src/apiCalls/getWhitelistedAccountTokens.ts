import axios from 'axios';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWhitelistedTokens } from './getWhitelistedTokens';

export const getWhitelistedAccountTokens = async (
  apiAddress: string,
  accountAddress: string
): Promise<AccountToken[]> => {
  const tokenIdentifiers = await getWhitelistedTokens();
  const tokenIdentifierChunks = sliceIntoChunks(tokenIdentifiers, 25);

  const tokens = await Promise.all(
    tokenIdentifierChunks.map(async (identifiers) => {
      const { data } = await axios.get(
        `${apiAddress}/accounts/${accountAddress}/tokens`,
        {
          params: {
            identifiers: identifiers.join()
          }
        }
      );

      return data as AccountToken[];
    })
  );

  return tokens.flat();
};
