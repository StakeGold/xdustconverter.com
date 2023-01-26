import { gql } from '@apollo/client';

export const CONTRACT_STATUS = gql`
  query contractStatus {
    contractActive
  }
`;
