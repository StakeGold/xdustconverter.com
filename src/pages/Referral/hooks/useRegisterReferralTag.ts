import { getChainID } from '@elrondnetwork/dapp-core/utils';
import { BytesValue, Transaction } from '@elrondnetwork/erdjs/out';
import { dustSmartContract } from 'apiCalls';

export const useRegisterReferralTag = () => {
  const registerReferralTag = (tag: string): Transaction | undefined => {
    try {
      const interaction = dustSmartContract.methodsExplicit
        .registerReferralTag([new BytesValue(Buffer.from(tag, 'utf-8'))])
        .withGasLimit(10_000_000)
        .withChainID(getChainID());

      return interaction.buildTransaction();
    } catch (err) {
      console.error('Unable to call registerReferralTag transaction', err);
      return undefined;
    }
  };

  return registerReferralTag;
};
