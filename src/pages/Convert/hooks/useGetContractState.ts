import React from 'react';
import { useQuery } from '@apollo/client';
import { CONTRACT_STATUS } from '../../../api/queries';

export const useGetContractState = (): 'Active' | 'Inactive' | undefined => {
  const { data, loading, error } = useQuery(CONTRACT_STATUS);

  return React.useMemo(() => {
    return data?.contractActive !== null
      ? data?.contractActive
        ? 'Active'
        : 'Inactive'
      : undefined;
  }, [data, loading, error]);
};
