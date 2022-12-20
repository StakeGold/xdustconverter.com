import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { getChainID } from '@elrondnetwork/dapp-core/utils';
import {
  Address,
  BigUIntValue,
  TokenPayment,
  Transaction
} from '@elrondnetwork/erdjs/out';
import { BigNumber } from 'bignumber.js';
import { AccountToken } from 'types';
import { dustSmartContract } from '../helpers';

export const useGetSwapDustTokens = () => {
  const { address } = useGetAccount();

  const swapDustTokens = (
    totalWegld: BigNumber,
    tokens: AccountToken[]
  ): Transaction | undefined => {
    try {
      const args = tokens.map((token) => {
        return TokenPayment.fungibleFromBigInteger(
          token.identifier,
          new BigNumber(token.balance)
        );
      });

      return dustSmartContract.methodsExplicit
        .swapDustTokens([
          new BigUIntValue(totalWegld.shiftedBy(18).decimalPlaces(18))
        ])
        .withMultiESDTNFTTransfer(args, Address.fromString(address))
        .withGasLimit(args.length * 10000000)
        .withChainID(getChainID())
        .buildTransaction();
    } catch (err) {
      console.error('Unable to call swapDustTokens transaction', err);
    }
  };

  return swapDustTokens;
};
