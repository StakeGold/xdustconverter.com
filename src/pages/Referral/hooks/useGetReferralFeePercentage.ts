import { useEffect, useState } from 'react';
import { ResultsParser } from '@multiversx/sdk-core/out';
import {
  BytesValue,
  ContractFunction
} from '@multiversx/sdk-core/out/smartcontracts';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { BigNumber } from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getReferralFeePercentage';

export const useGetReferralFeePercentage = (tag: string | undefined) => {
  const { network } = useGetNetworkConfig();
  const [feePercent, setFeePercent] = useState<number>(-1);

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getReferralFeePercentage = async () => {
    if (!tag) {
      return -1;
    }

    try {
      const query = dustSmartContract.createQuery({
        func: new ContractFunction(endpoint),
        args: [new BytesValue(Buffer.from(tag, 'utf-8'))]
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

      const { firstValue: fee } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const feeNumber = new BigNumber(fee?.valueOf() ?? 0)
        .shiftedBy(-2)
        .toNumber();

      setFeePercent(feeNumber);
    } catch (err) {
      console.error('Unable to call useGetReferralFeePercentage', err);
    }
  };

  useEffect(() => {
    getReferralFeePercentage();
  }, [tag]);

  return feePercent;
};
