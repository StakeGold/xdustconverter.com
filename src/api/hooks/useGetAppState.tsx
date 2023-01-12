import React from 'react';
import { useQuery } from '@apollo/client';
import { APP_STATE } from 'api/queries';

const useGetAppState = (): string | undefined => {
  const { data, loading, error } = useQuery(APP_STATE);

  return React.useMemo(() => {
    return data?.app?.state;
  }, [data, loading, error]);
};

export { useGetAppState };
