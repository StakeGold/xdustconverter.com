import { gql } from '@apollo/client';

export const SWAP_TOKENS = gql`
  mutation swapDustTokens($input: SwapDustTokensArgs!) {
    swapDustTokens(input: $input) {
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

// call mutation swapDustTokens
