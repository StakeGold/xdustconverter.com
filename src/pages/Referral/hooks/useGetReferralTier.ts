import BigNumber from 'bignumber.js';
import { TIERS } from 'config';

export const useGetReferralTier = (): {
  currentTier: any;
  nextTier: any | undefined;
} => {
  const collectedFees = new BigNumber('2000000'); // TODO;

  const tiers = TIERS.sort((a, b) => a.feePercent - b.feePercent);

  let currentTierIndex = 0;
  for (let i = 1; i < tiers.length; i++) {
    if (collectedFees.isGreaterThanOrEqualTo(tiers[i].minVolume)) {
      currentTierIndex = i;
    }
  }

  return {
    currentTier: tiers[currentTierIndex],
    nextTier:
      currentTierIndex < tiers.length - 1
        ? tiers[currentTierIndex + 1]
        : undefined
  };
};
