import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { dustSmartContract } from 'apiCalls';

const resultsParser = new ResultsParser();
const endpoint = 'getUserTag';

export const getReferralTag = async (
  apiAddress: string,
  address: string
): Promise<string | undefined> => {
  try {
    const proxy = new ProxyNetworkProvider(apiAddress);

    const query = dustSmartContract.createQuery({
      func: new ContractFunction(endpoint),
      args: [new AddressValue(new Address(address))]
    });
    const queryResponse = await proxy.queryContract(query);

    const endpointDefinition = dustSmartContract.getEndpoint(endpoint);
    const { firstValue } = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    const value = (firstValue?.valueOf().toString() as string) ?? '';
    return value === '' ? undefined : value;
  } catch (err) {
    console.error('Unable to call getReferralTag', err);
    return undefined;
  }
};
