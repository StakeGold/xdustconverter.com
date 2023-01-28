import { gql } from '@apollo/client';

export const DAPP_CONFIG = gql`
  query dappConfig {
    dappConfig {
      environment
      updateRefreshRate
      apiTimeout
      walletConnectV2ProjectId
      minAmount
      slippage
    }
  }
`;
