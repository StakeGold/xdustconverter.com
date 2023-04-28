import {
  BytesValue,
  ContractFunction,
  ResultsParser
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import BigNumber from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getTagAccumulatedVolume';

export const getTagAccumulatedVolume = async (
  apiAddress: string,
  tag: string
) => {
  try {
    const proxy = new ProxyNetworkProvider(apiAddress);

    const query = dustSmartContract.createQuery({
      func: new ContractFunction(endpoint),
      args: [new BytesValue(Buffer.from(tag, 'utf-8'))]
    });
    const queryResponse = await proxy.queryContract(query);

    const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

    const { firstValue } = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    return new BigNumber(firstValue?.valueOf() ?? 0);
  } catch (err) {
    console.error('Unable to call getTiers', err);
    return new BigNumber(0);
  }
};
