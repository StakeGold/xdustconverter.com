import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';

export const ENVIRONMENT = EnvironmentsEnum.devnet;
export const UPDATE_REFRESH_RATE = 60000;
export const API_TIMEOUT = 6000;
export const CONTRACT_ADDRESS =
  'erd1qqqqqqqqqqqqqpgq38zwarrn24c6df4essae6k8xeywf7aaa4jusz203xk';
export const WALLET_CONNECT_V2_PROJECT_ID = '9c1851da02319e1280cbbf2de5d8ee46';
export const WEGLD_ID = 'WEGLD-d7c6bb';
export const USDC_ID = 'USDC-8d4068';
export const X_EXCHANGE_URL =
  'https://devnet-graphql-next.maiar.exchange/graphql';
export const MIN_AMOUNT = 0.01;
export const SLIPPAGE = 0.005;
export const TIERS = [
  {
    name: 'Bronze',
    minVolume: '0',
    feePercent: 0.05
  },
  {
    name: 'Silver',
    minVolume: '500000000000000000',
    feePercent: 0.1
  },
  {
    name: 'Gold',
    minVolume: '750000000000000000',
    feePercent: 0.2
  },
  {
    name: 'Platinum',
    minVolume: '1000000000000000000',
    feePercent: 0.3
  }
];
