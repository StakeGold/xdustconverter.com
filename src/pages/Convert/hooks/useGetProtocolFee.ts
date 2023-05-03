import React from 'react';
import { useQuery } from '@apollo/client';
import { PROTOCOL_FEE } from '../../../api/queries';

export const useGetProtocolFee = (): number => {
  const { data, loading, error } = useQuery(PROTOCOL_FEE);

  const feePercent = data?.protocolFeePercent ?? 0;

  return React.useMemo(() => {
    return feePercent;
  }, [data, loading, error]);
};
