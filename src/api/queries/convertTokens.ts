import { gql } from '@apollo/client';

export const CUSTOM_CONVERT_TOKENS = gql`
  query customConvertTokens {
    customConvertTokens {
      identifier
      name
      ticker
      decimals
      svgUrl
      price
      priceWEGLD
    }
  }
`;
