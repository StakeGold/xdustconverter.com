import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';
import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import axios from 'axios';
import { ENVIRONMENT } from 'config';
import { Pair } from 'types/Pair';

export const useGetWegldPrice = () => {
  const { network } = useGetNetworkConfig();
  const [wegldPrice, setWegldPrice] = useState<number | undefined>();

  const getWegldPrice = async () => {
    try {
      if (ENVIRONMENT === EnvironmentsEnum.devnet) {
        const pair = {
          address:
            'erd1qqqqqqqqqqqqqpgqeel2kumf0r8ffyhth7pqdujjat9nx0862jpsg2pqaq',
          id: 'EGLDUSDC-594e5e',
          price: 3.7514981396049125e23,
          baseId: 'WEGLD-bd4d79',
          basePrice: 38.9873475307993,
          baseSymbol: 'WEGLD',
          baseName: 'WrappedEGLD',
          quoteId: 'USDC-c76f1f',
          quotePrice: 1,
          quoteSymbol: 'USDC',
          quoteName: 'WrappedUSDC'
        } as Pair;

        setWegldPrice(pair.basePrice);

        return;
      }

      const { data } = await axios.get(
        `${network.apiAddress}/mex/pairs/WEGLD-bd4d79/USDC-c76f1f`
      );

      const pair = data as Pair;
      setWegldPrice(pair?.basePrice);
    } catch (err) {
      console.error('Unable to call getWegldPrice', err);
    }
  };

  useEffect(() => {
    getWegldPrice();
  }, []);

  return wegldPrice;
};
