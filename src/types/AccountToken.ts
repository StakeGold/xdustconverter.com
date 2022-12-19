export interface AccountToken {
  identifier: string;
  name: string;
  ticker: string;
  decimals: number;
  balance: string;
  price: number;
  valueUsd: number;
  valueWegld: string;
  assets: {
    svgUrl: string;
  };
}
