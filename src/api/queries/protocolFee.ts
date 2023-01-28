import { gql } from '@apollo/client';

export const PROTOCOL_FEE = gql`
  query protocolFee {
    protocolFeePercent
  }
`;
