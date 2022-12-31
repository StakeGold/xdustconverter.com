import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import {
  BytesValue,
  ContractFunction,
  ResultsParser
} from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getReferralFeePercentage';

export const getReferralFeePercentage = async (
  apiAddress: string,
  tag: string
): Promise<number> => {
  try {
    const proxy = new ProxyNetworkProvider(apiAddress);

    const query = dustSmartContract.createQuery({
      func: new ContractFunction(endpoint),
      args: [new BytesValue(Buffer.from(tag, 'utf-8'))]
    });
    const queryResponse = await proxy.queryContract(query);

    const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

    const { firstValue: fee } = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    const feeNumber = new BigNumber(fee?.valueOf() ?? 0)
      .shiftedBy(-2)
      .toNumber();

    return feeNumber;
  } catch (err) {
    console.error('Unable to call getReferralFeePercentage', err);
    return 0;
  }
};
