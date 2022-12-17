import { useEffect, useState } from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { AxiosError } from 'axios';
import { getAllAccountTokens } from 'apiCalls';
import { AccountToken } from 'types';

export const useGetAccountTokens = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();

  const [tokens, setTokens] = useState<AccountToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchAccountTokens = async () => {
    try {
      setIsLoading(true);

      const allTokens = await getAllAccountTokens(apiAddress, address);

      setTokens(allTokens);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAccountTokens();
  }, []);

  return { tokens, isLoading, error };
};
