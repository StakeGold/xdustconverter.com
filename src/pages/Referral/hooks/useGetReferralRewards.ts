import { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser
} from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { dustSmartContract, getXExchangePrices } from 'apiCalls';
import { WEGLD_ID } from 'config';

const resultsParser = new ResultsParser();
const endpoint = 'getCollectedFeeAmount';

export const useGetReferralRewards = () => {
  const { address } = useGetAccount();

  const [rewards, setRewards] = useState<{ egld: string; usd?: string }>({
    egld: '0',
    usd: '0'
  });

  const { network } = useGetNetworkConfig();
  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const fetchReferralRewards = async () => {
    try {
      const query = dustSmartContract.createQuery({
        func: new ContractFunction(endpoint),
        args: [new AddressValue(new Address(address))]
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = dustSmartContract.getEndpoint(endpoint);
      const { firstValue } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const egldValue = new BigNumber(firstValue?.valueOf() ?? 0);
      if (egldValue.isLessThanOrEqualTo(0)) {
        setRewards({
          egld: '0',
          usd: '0'
        });
      }

      const egld = egldValue.toFixed();

      const tokenPrices = await getXExchangePrices();
      const wegldTokenPrice = tokenPrices.find(
        (price) => price.identifier === WEGLD_ID
      );
      const wegldPrice = new BigNumber(wegldTokenPrice?.price ?? 0);

      if (wegldPrice.isLessThanOrEqualTo(0)) {
        setRewards({ egld, usd: undefined });
      }

      const usd = new BigNumber(egld)
        .shiftedBy(-18)
        .multipliedBy(wegldPrice)
        .decimalPlaces(2, BigNumber.ROUND_DOWN)
        .toFixed();

      setRewards({ egld, usd });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReferralRewards();
  }, []);

  return {
    rewards,
    reloadReferralRewards: fetchReferralRewards
  };
};
