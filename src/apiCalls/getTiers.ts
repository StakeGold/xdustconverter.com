import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { ContractFunction, ResultsParser } from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { dustSmartContract } from 'apiCalls';
import { TierDetails } from 'types';

const resultsParser = new ResultsParser();
const endpoint = 'getTierDetails';

export const getTiers = async (apiAddress: string) => {
  try {
    const proxy = new ProxyNetworkProvider(apiAddress);

    const query = dustSmartContract.createQuery({
      func: new ContractFunction(endpoint)
    });
    const queryResponse = await proxy.queryContract(query);

    const endpointDefinition = dustSmartContract.getEndpoint(endpoint);

    const { firstValue } = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    const tiers = firstValue
      ?.valueOf()
      ?.map((tier: any) => {
        return {
          name: String.fromCharCode(...tier.name),
          feePercent: Number(tier.fee_percent) / 100,
          minVolume: new BigNumber(tier.min_volume)
        } as TierDetails;
      })
      .sort((a: TierDetails, b: TierDetails) => a.feePercent - b.feePercent);

    return tiers ?? [];
  } catch (err) {
    console.error('Unable to call getTiers', err);
  }
};
