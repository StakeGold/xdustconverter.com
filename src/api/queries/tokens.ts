import { gql } from '@apollo/client';

export const WHITELISTED_TOKENS = gql`
  query whitelistedTokens {
    whitelistedTokens {
      identifier
      name
      ticker
      decimals
      svgUrl
    }
  }
`;
