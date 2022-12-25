import React, { useEffect, useState } from 'react';
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
import { AxiosError } from 'axios';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getUserTag';

export const useGetUserReferralTag = () => {
  const { address } = useGetAccount();

  const [tag, setTag] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const { network } = useGetNetworkConfig();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const fetchTag = async () => {
    try {
      setIsLoading(true);

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

      const value = (firstValue?.valueOf().toString() as string) ?? '';
      setTag(value === '' ? undefined : value);
    } catch (err) {
      console.error(error);

      const { message } = err as AxiosError;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTag();
  }, []);

  return { tag, isLoading, error, reloadTag: fetchTag };
};
