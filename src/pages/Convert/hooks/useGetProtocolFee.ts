import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { ResultsParser } from '@elrondnetwork/erdjs/out';
import { ContractFunction } from '@elrondnetwork/erdjs/out/smartcontracts';
import { BigNumber } from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getProtocolFeePercent';

export const useGetProtocolFee = () => {
  const { network } = useGetNetworkConfig();
  const [feePercent, setFeePercent] = useState<number | undefined>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getProtocolFee = async () => {
    try {
      const query = dustSmartContract.createQuery({
        func: new ContractFunction(endpoint)
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
      console.error('Unable to call getProtocolFeePercent', err);
    }
  };

  useEffect(() => {
    getProtocolFee();
  }, []);

  return feePercent;
};
