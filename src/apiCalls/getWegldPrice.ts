import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import axios from 'axios';
import { ENVIRONMENT } from 'config';
import { Pair } from 'types/Pair';

export const getWegldPrice = async (
  apiAddress: string
): Promise<number | undefined> => {
  try {
    if (ENVIRONMENT === EnvironmentsEnum.devnet) {
      return 38.9873475307993;
    }

    const { data } = await axios.get(
      `${apiAddress}/mex/pairs/WEGLD-bd4d79/USDC-c76f1f`
    );

    const pair = data as Pair;
    return pair.basePrice;
  } catch (err) {
    console.error('Unable to call getWegldPrice', err);
    return undefined;
  }
};
