import BigNumber from 'bignumber.js';
import { TierDetails } from './TierDetails';

export class ReferralDetails {
  tag = '';
  feePercentage = 0;
  accumulatedVolume = new BigNumber(0);
  currentTier!: TierDetails;
  nextTier?: TierDetails;
  referralRewards!: ReferralRewards;

  constructor(init?: Partial<ReferralDetails>) {
    Object.assign(this, init);
  }

  static fromResponse(response: any): ReferralDetails {
    return new ReferralDetails({
      tag: response.tag,
      feePercentage: response.feePercentage,
      accumulatedVolume: new BigNumber(response.accumulatedVolume),
      currentTier: TierDetails.fromResponse(response.currentTier),
      nextTier: TierDetails.fromResponse(response.nextTier),
      referralRewards: response.referralRewards as ReferralRewards
    });
  }
}

export interface ReferralRewards {
  balance: string;
  valueUsd: string;
}
