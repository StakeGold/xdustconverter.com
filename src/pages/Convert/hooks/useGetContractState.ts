import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { ResultsParser } from '@elrondnetwork/erdjs/out';
import { ContractFunction } from '@elrondnetwork/erdjs/out/smartcontracts';
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
      const { firstValue: state } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setContractState(state.name);
    } catch (err) {
      setContractState('Inactive');
    }
  };

  useEffect(() => {
    getContractState();
  }, []);

  return contractState;
};
