import React from 'react';
import { useQuery } from '@apollo/client';
import { DAPP_CONFIG } from 'api/queries';
import { DappConfig } from 'types/DappConfig';

export const useGetDappConfig = (): {
  dappConfig?: DappConfig;
  loading: boolean;
} => {
  const { data, loading } = useQuery(DAPP_CONFIG);

  return React.useMemo(() => {
    if (!data || !data.dappConfig) {
      return { dappConfig: undefined, loading };
    }

    return { dappConfig: DappConfig.fromResponse(data.dappConfig), loading };
  }, [data]);
};
