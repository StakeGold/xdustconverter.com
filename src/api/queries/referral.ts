import { gql } from '@apollo/client';

export const REFERRAL_INFO = gql`
  query referralInfo {
    accountReferralInfo {
      tag
      feePercentage
      accumulatedVolume
      currentTier {
        name
        minVolume
        feePercent
      }
      nextTier {
        name
        minVolume
        feePercent
      }
      referralRewards {
        balance
        valueUsd
      }
    }

    allTiers {
      name
      minVolume
      feePercent
    }
  }
`;

// query for accountReferralInfo + allTiers
