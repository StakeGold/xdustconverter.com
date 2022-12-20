import axios from 'axios';
import { USDC_ID, WEGLD_ID } from 'config';
import { Pair } from 'types/Pair';

export const getWegldPrice = async (
  apiAddress: string
): Promise<number | undefined> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/mex/pairs/${WEGLD_ID}/${USDC_ID}`
    );

    const pair = data as Pair;
    return pair.basePrice;
  } catch (err) {
    console.error('Unable to call getWegldPrice', err);
    return undefined;
  }
};
