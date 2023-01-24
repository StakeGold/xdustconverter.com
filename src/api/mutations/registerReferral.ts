import { gql } from '@apollo/client';

export const REGISTER_REFERRAL = gql`
  mutation registerReferral($tag: String!) {
    transactions: registerReferralTag(tag: $tag) {
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

// call mutation registerReferralTag
