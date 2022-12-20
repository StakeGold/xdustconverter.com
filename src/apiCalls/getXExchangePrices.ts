import axios from 'axios';
import { X_EXCHANGE_URL } from 'config';
import { XExchangeToken } from 'types';

export const getXExchangePrices = async (): Promise<XExchangeToken[]> => {
  try {
    const query = `{
      tokens {
        identifier
        price
        derivedEGLD
      }
    }`;

    const { data } = await axios.post(X_EXCHANGE_URL, { query });

    const tokens = data?.data?.tokens ?? [];
    return tokens as XExchangeToken[];
  } catch (error) {
    throw error;
  }
};
