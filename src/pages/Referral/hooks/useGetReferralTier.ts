import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';
import BigNumber from 'bignumber.js';
import { getTagAccumulatedVolume, getTiers } from 'apiCalls';
import { TierDetails } from 'types';

export const useGetReferralTier = (tag: string) => {
  const { network } = useGetNetworkConfig();

  const [userTier, setUserTier] = useState<{
    currentTier: TierDetails;
    tagAccumulatedVolume: BigNumber;
    nextTier: TierDetails | undefined;
  }>();

  const getReferralTier = async () => {
    try {
      const tagAccumulatedVolume = await getTagAccumulatedVolume(
        network.apiAddress,
        tag
      );
      const tiers = await getTiers(network.apiAddress);

      let currentTierIndex = 0;
      for (let i = 1; i < tiers.length; i++) {
        if (tagAccumulatedVolume.isGreaterThanOrEqualTo(tiers[i].minVolume)) {
          currentTierIndex = i;
        }
      }

      setUserTier({
        currentTier: tiers[currentTierIndex],
        tagAccumulatedVolume,
        nextTier:
          currentTierIndex < tiers.length - 1
            ? tiers[currentTierIndex + 1]
            : undefined
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReferralTier();
  }, []);

  return { userTier };
};
