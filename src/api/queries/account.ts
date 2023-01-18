import { gql } from '@apollo/client';

export const ACCOUNT_DETAILS = gql`
  query accountDetails {
    accountDetails {
      address
      balance
      tokens {
        identifier
        name
        ticker
        decimals
        balance
        valueUsd
        valueWegld
        svgUrl
      }
    }
  }
`;

// query for accountDetails
