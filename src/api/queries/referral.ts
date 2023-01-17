import { gql } from '@apollo/client';

export const REFERRAL_INFO = gql`
  query referralInfo {
    accountReferralInfo {
      tag
      feePercentage
      accumulatedVolume
      currentTier
      nextTier
      referralRewards
    }
  }
`;

// query for accountReferralInfo
