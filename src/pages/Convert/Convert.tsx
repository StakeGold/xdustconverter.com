import React, { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { ServerTransactionType } from '@elrondnetwork/dapp-core/types';
import {
  TransactionsTable,
  Loader,
  PageState
} from '@elrondnetwork/dapp-core/UI';
import { faBan, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import { apiTimeout, contractAddress } from 'config';
import { ConvertLayout } from './components/ConvertLayout';

const ConvertPage = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();

  console.log(apiAddress, address);

  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data: ServerTransactionType[] = [];
      setTransactions(data);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (success || fail) {
      fetchTransactions();
    }
  }, [success, fail]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='my-5'>
        <PageState
          icon={faExchangeAlt}
          className='text-muted'
          title='No Transactions'
        />
      </div>
    );
  }

  return <TransactionsTable transactions={transactions} />;
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);
