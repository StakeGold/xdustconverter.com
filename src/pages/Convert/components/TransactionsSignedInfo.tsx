import React from 'react';

export interface TransactionsSignedInfoProps {
  transactions: number;
}

export const TransactionsSignedInfo = ({
  transactions
}: TransactionsSignedInfoProps) => {
  const transactionsFormatted =
    transactions === 1 ? 'transaction' : 'transactions';
  return (
    <div className='text-secondary text-center mt-3'>
      You will be asked to sign{' '}
      <b>
        {transactions} {transactionsFormatted}
      </b>
    </div>
  );
};
