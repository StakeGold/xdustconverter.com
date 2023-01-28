import { gql } from '@apollo/client';

export const TIERS = gql`
  query tiers {
    allTiers {
      name
      minVolume
      feePercent
    }
  }
`;
