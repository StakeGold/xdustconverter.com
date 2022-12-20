import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import { AccountToken } from 'types';
import { sliceIntoChunks } from 'utils';
import { getWhitelistedTokens } from './getWhitelistedTokens';
import { getXExchangePrices } from './getXExchangePrices';

export const getWhitelistedAccountTokens = async (
  apiAddress: string,
  accountAddress: string
): Promise<AccountToken[]> => {
  const maxWegldValue = '0.5';
  const tokenIdentifiers = await getWhitelistedTokens(apiAddress);
  const tokenIdentifierChunks = sliceIntoChunks(tokenIdentifiers, 25);

  const tokenPrices = await getXExchangePrices();

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

  for (const token of tokens) {
    const dexPrice = tokenPrices.find((t) => t.identifier === token.identifier);
    if (!dexPrice) {
      throw new Error(`DEX price for ${token.identifier} is undefined`);
    }

    token.valueUsd = new BigNumber(token.balance)
      .shiftedBy(-token.decimals)
      .multipliedBy(dexPrice.price)
      .decimalPlaces(6)
      .toFixed();
    token.valueWegld = new BigNumber(token.balance)
      .shiftedBy(-token.decimals)
      .multipliedBy(dexPrice.derivedEGLD)
      .decimalPlaces(18)
      .toFixed();
  }

  const filteredTokens = tokens.filter((token) =>
    new BigNumber(token.valueWegld).isLessThanOrEqualTo(maxWegldValue)
  );
  return filteredTokens;
};
