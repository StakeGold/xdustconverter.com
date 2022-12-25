import BigNumber from 'bignumber.js';

export const useGetReferralRewards = (): { egld: string; usd: string } => {
  // TODO
  const referralRewards = '150000000001000000';

  const valueUsd = new BigNumber(referralRewards)
    .shiftedBy(-18)
    .multipliedBy(35)
    .decimalPlaces(2, BigNumber.ROUND_DOWN)
    .toFixed();

  return { egld: referralRewards, usd: valueUsd };
};
