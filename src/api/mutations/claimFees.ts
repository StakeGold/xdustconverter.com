import { gql } from '@apollo/client';

export const CLAIM_FEES = gql`
  mutation claimReferralFees {
    transactions: claimReferralFees {
      nonce
      value
      receiver
      sender
      gasPrice
      gasLimit
      data
      chainID
      version
      options
      signature
    }
  }
`;
