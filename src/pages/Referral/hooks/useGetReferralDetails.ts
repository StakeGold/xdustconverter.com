import { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import * as apiCalls from 'apiCalls';
import { ReferralDetails, TierDetails } from 'types';

export const useGetReferralDetails = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [referralDetails, setReferralDetails] = useState<
    ReferralDetails | undefined
  >(undefined);
  const [tiers, setTiers] = useState<TierDetails[]>([]);

  const refetchReferralDetails = async () => {
    try {
      setIsLoading(true);

      const allTiers = await apiCalls.getTiers(network.apiAddress);
      setTiers(allTiers);

      const tag = await apiCalls.getReferralTag(network.apiAddress, address);
      if (!tag) {
        setReferralDetails(undefined);
        return;
      }

      const [feePercentage, accumulatedVolume] = await Promise.all([
        apiCalls.getReferralFeePercentage(network.apiAddress, tag),
        apiCalls.getTagAccumulatedVolume(network.apiAddress, tag)
      ]);

      let currentTierIndex = 0;

      for (let i = 1; i < allTiers.length; i++) {
        if (
          accumulatedVolume.isGreaterThanOrEqualTo(allTiers[i].minVolume) &&
          feePercentage >= allTiers[i].feePercent
        ) {
          currentTierIndex = i;
        }
      }

      const currentTier = allTiers[currentTierIndex];
      const nextTier =
        currentTierIndex < allTiers.length - 1
          ? allTiers[currentTierIndex + 1]
          : undefined;

      setReferralDetails({
        tag,
        feePercentage,
        accumulatedVolume,
        currentTier,
        nextTier
      });
    } catch (err: any) {
      console.error(error);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchReferralDetails();
  }, [address]);

  return { referralDetails, tiers, isLoading, error, refetchReferralDetails };
};
