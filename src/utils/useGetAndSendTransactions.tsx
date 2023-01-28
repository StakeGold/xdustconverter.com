import * as React from 'react';
import { DocumentNode, useMutation } from '@apollo/client';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { sendAndSignTransactions } from 'apiCalls';

const useGetAndSendTransactions = (
  mutation: DocumentNode,
  displayInfo: any
): [execute: ({ variables }: { variables: any }) => void, status: any] => {
  const { address: sender } = useGetAccountInfo();

  const [getTransactions, { data, error, loading }] = useMutation(mutation);

  const execute = ({ variables }: { variables: any }) => {
    getTransactions({
      variables: {
        sender,
        ...variables
      }
    });
  };

  React.useEffect(() => {
    const transactions = data?.transactions;
    if (transactions) {
      if (Array.isArray(transactions)) {
        sendAndSignTransactions(transactions.flat(), displayInfo);
      } else {
        sendAndSignTransactions([transactions], displayInfo);
      }
    }
  }, [data?.transactions, error]);

  return [execute, { loading, error }];
};

export default useGetAndSendTransactions;
