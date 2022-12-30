import BigNumber from 'bignumber.js';
import { TierDetails } from './TierDetails';

export interface ReferralDetails {
  tag: string;
  feePercentage: number;
  accumulatedVolume: BigNumber;
  currentTier: TierDetails;
  nextTier?: TierDetails;
}
