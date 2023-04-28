import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import BigNumber from 'bignumber.js';
import { getTagAccumulatedVolume, getTiers } from 'apiCalls';
import { TierDetails } from 'types';

export const useGetReferralTier = (tag: string, feePercentage: number) => {
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
        if (
          tagAccumulatedVolume.isGreaterThanOrEqualTo(tiers[i].minVolume) &&
          feePercentage >= tiers[i].feePercent
        ) {
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
  }, [feePercentage, tag]);

  return { userTier, refetchUserTier: getReferralTier };
};
