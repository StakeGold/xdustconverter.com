import { useEffect, useState } from 'react';
import { ResultsParser } from '@multiversx/sdk-core/out';
import { ContractFunction } from '@multiversx/sdk-core/out/smartcontracts';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getState';

export const useGetContractState = (): 'Active' | 'Inactive' | undefined => {
  const { network } = useGetNetworkConfig();
  const [contractState, setContractState] = useState<'Active' | 'Inactive'>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getContractState = async () => {
    try {
      const query = dustSmartContract.createQuery({
        func: new ContractFunction(endpoint)
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { firstValue: state } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setContractState('Inactive');
    } catch (err) {
      setContractState('Inactive');
    }
  };

  useEffect(() => {
    getContractState();
  }, []);

  return contractState;
};
