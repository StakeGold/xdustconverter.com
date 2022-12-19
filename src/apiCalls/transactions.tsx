import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { TransactionsDisplayInfoType } from '@elrondnetwork/dapp-core/types';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
export const sendAndSignTransactions = async (
  transactions: Transaction[],
  transactionsDisplayInfo: TransactionsDisplayInfoType,
  callbackRoute?: string,
  minGasLimit = 20000000
): Promise<{
  success: boolean;
  error: string;
  sessionId: string | null;
}> => {
  try {
    await refreshAccount();
    const { sessionId, error } = await sendTransactions({
      transactions: transactions,
      transactionsDisplayInfo,
      callbackRoute: callbackRoute,
      redirectAfterSign: callbackRoute,
      minGasLimit
    });
    await refreshAccount();
    return { success: error !== undefined, error: error ?? '', sessionId };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, sessionId: null };
  }
};
