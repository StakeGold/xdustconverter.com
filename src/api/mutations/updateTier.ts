import { gql } from '@apollo/client';

export const UPDATE_TIER = gql`
  mutation updateTier {
    updateTier {
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

// call mutation updateTier
