import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import axios from 'axios';
import { ENVIRONMENT } from 'config';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWhitelistedTokens } from './getWhitelistedTokens';

export const getWhitelistedAccountTokens = async (
  apiAddress: string,
  accountAddress: string
): Promise<AccountToken[]> => {
  // accountAddress = 'erd15pfa69860rx8klgg37zg9lh7kn2ud62e6zlp4ndcq2es6zjvny8qzpvf4p';

  const maxUSDValue = 0.5; // TODO;
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
  ).then((response) => response.flat());

  if (ENVIRONMENT === EnvironmentsEnum.devnet) {
    for (const token of tokens) {
      token.price = 0.04;
      token.valueUsd = maxUSDValue;
    }
  }

  const filteredTokens = tokens.filter(
    (token) => token.valueUsd <= maxUSDValue
  );
  return filteredTokens;
};
