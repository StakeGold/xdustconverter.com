import BigNumber from 'bignumber.js';

export interface TierDetails {
  name: string;
  minVolume: BigNumber;
  feePercent: number;
}
