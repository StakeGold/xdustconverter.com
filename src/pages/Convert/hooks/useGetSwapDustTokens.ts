import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { getChainID } from '@elrondnetwork/dapp-core/utils';
import {
  Address,
  BigUIntValue,
  BytesValue,
  TokenPayment,
  Transaction,
  TypedValue
} from '@elrondnetwork/erdjs/out';
import { BigNumber } from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';
import { AccountToken } from 'types';

export const useGetSwapDustTokens = () => {
  const { address } = useGetAccount();

  const swapDustTokens = (
    totalWegld: BigNumber,
    tokens: AccountToken[],
    referralTag: string | null
  ): Transaction | undefined => {
    if (tokens.length === 0) {
      return undefined;
    }

    try {
      const args = tokens.map((token) => {
        return TokenPayment.fungibleFromBigInteger(
          token.identifier,
          new BigNumber(token.balance)
        );
      });

      const endpointArgs: TypedValue[] = [
        new BigUIntValue(totalWegld.shiftedBy(18).decimalPlaces(18))
      ];
      if (referralTag) {
        endpointArgs.push(new BytesValue(Buffer.from(referralTag, 'utf-8')));
      }

      const interaction = dustSmartContract.methodsExplicit
        .swapDustTokens(endpointArgs)
        .withGasLimit(args.length * 10000000)
        .withChainID(getChainID());

      args.length === 1
        ? interaction.withSingleESDTTransfer(args[0])
        : interaction.withMultiESDTNFTTransfer(
            args,
            Address.fromString(address)
          );

      return interaction.buildTransaction();
    } catch (err) {
      console.error('Unable to call swapDustTokens transaction', err);
      return undefined;
    }
  };

  return swapDustTokens;
};
