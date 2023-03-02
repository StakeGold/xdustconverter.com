import {
  Address,
  BigUIntValue,
  BytesValue,
  TokenPayment,
  Transaction,
  TypedValue
} from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { getChainID } from '@multiversx/sdk-dapp/utils';
import { BigNumber } from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';
import { AccountToken } from 'types';

export const useGetSwapDustTokens = () => {
  const { address } = useGetAccount();

  const displayInfo = {
    processingMessage: 'Converting small amounts',
    errorMessage: 'An error has occurred while converting small amounts',
    successMessage: 'Converting small amounts succeeded'
  };

  const swapDustTokens = (
    totalWegld: BigNumber,
    tokens: AccountToken[],
    referralTag: string | null
  ): { transaction?: Transaction; displayInfo: any } => {
    if (tokens.length === 0) {
      return { displayInfo };
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

      return {
        transaction: interaction.buildTransaction(),
        displayInfo
      };
    } catch (err) {
      console.error('Unable to call swapDustTokens transaction', err);
      return { displayInfo };
    }
  };

  return swapDustTokens;
};
