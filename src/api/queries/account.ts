import { gql } from '@apollo/client';

export const ACCOUNT_DETAILS = gql`
  query accountDetails {
    accountDetails {
      address
      balance
      tokens
    }
  }
`;

// query for accountDetails
