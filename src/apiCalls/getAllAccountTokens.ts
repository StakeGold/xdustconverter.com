import axios from 'axios';
import { AccountToken } from 'types';

export const getAllAccountTokens = async (
  apiAddress: string,
  accountAddress: string
): Promise<AccountToken[]> => {
  const allTokens: AccountToken[] = [];
  let currentTokens: AccountToken[] = [];

  const size = 25;
  let from = 0;
  do {
    const response = await axios.get(
      `${apiAddress}/accounts/${accountAddress}/tokens`,
      {
        params: {
          from,
          size
        }
      }
    );

    currentTokens = response.data;

    allTokens.push(...currentTokens);

    from = from + size;
  } while (currentTokens.length >= size);

  return allTokens;
};
