import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import { ENVIRONMENT } from 'config';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWegldPrice } from './getWegldPrice';
import { getWhitelistedTokens } from './getWhitelistedTokens';

export const getWhitelistedAccountTokens = async (
  apiAddress: string,
  accountAddress: string
): Promise<AccountToken[]> => {
  const maxWegldValue = '0.5';
  const tokenIdentifiers = await getWhitelistedTokens(apiAddress);
  const tokenIdentifierChunks = sliceIntoChunks(tokenIdentifiers, 25);
  const wegldPrice = await getWegldPrice(apiAddress);

  if (wegldPrice === undefined) {
    throw new Error('WEGLD price could not be fetched');
  }

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
      token.valueUsd = 0.123;
      token.valueWegld = maxWegldValue;
    }
  }

  const filteredTokens = tokens
    .map((token) => {
      return {
        ...token,
        valueWegld: new BigNumber(token.valueUsd)
          .dividedBy(wegldPrice)
          .toFixed()
      };
    })
    .filter((token) => token.valueWegld <= maxWegldValue);
  return filteredTokens;
};
