import { ResultsParser } from '@multiversx/sdk-core/out';
import { ContractFunction } from '@multiversx/sdk-core/out/smartcontracts';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { dustSmartContract } from './dustSmartContract';

const resultsParser = new ResultsParser();
const endpoint = 'getAllTokens';

export const getWhitelistedTokens = async (
  apiAddress: string
): Promise<string[]> => {
  const proxy = new ProxyNetworkProvider(apiAddress);

  try {
    const query = dustSmartContract.createQuery({
      func: new ContractFunction(endpoint)
    });
    const queryResponse = await proxy.queryContract(query);

    const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

    const { firstValue: tokens } = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    return tokens?.valueOf() ?? [];
  } catch (err) {
    console.error('Unable to call getAllTokens', err);
    return [];
  }
};
