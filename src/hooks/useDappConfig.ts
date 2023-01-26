import React from 'react';
import { useQuery } from '@apollo/client';
import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import { DAPP_CONFIG } from 'api/queries';

export const useDappConfig = () => {
  const { data } = useQuery(DAPP_CONFIG);

  return React.useMemo(() => {
    const environment = EnvironmentsEnum + '.' + data.environment;
    const updateRefreshRate = data.updateRefreshRate;
    const apiTimeout = data.apiTimeout;
    const walletConnectV2ProjectId = data.walletConnectV2ProjectId;
    const minAmount = data.minAmount;
    const slippage = data.slippage;
    return {
      environment,
      updateRefreshRate,
      apiTimeout,
      walletConnectV2ProjectId,
      minAmount,
      slippage
    };
  }, [data]);
};
