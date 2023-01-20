import React from 'react';
import { useQuery } from '@apollo/client';
import { PROTOCOL_FEE } from '../../../api/queries';

export const useGetProtocolFee = () => {
  const { data, loading, error } = useQuery(PROTOCOL_FEE);

  const feePercent = data?.protocolFeePercent;

  return React.useMemo(() => {
    return feePercent;
  }, [data, loading, error]);
};
