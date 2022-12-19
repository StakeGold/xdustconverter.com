import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { ENVIRONMENT } from 'config';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWhitelistedTokens } from './getWhitelistedTokens';

export const getWhitelistedDashboardTokens = async (
  apiAddress: string
): Promise<AccountToken[]> => {
  const tokenIdentifiers = await getWhitelistedTokens(apiAddress);
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
    balance: new BigNumber(1).shiftedBy(token.decimals).toString(),
    valueUsd: token.price,
    valueWegld: '0'
  }));

  if (ENVIRONMENT === EnvironmentsEnum.devnet) {
    for (const token of tokens) {
      token.price = 0.04;
      token.valueUsd = 0.123;
    }
  }

  return tokens;
};
