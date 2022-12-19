import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { ResultsParser } from '@elrondnetwork/erdjs/out';
import { ContractFunction } from '@elrondnetwork/erdjs/out/smartcontracts';
import { dustSmartContract } from 'pages/Convert/helpers';

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
