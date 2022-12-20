export interface AccountToken {
  identifier: string;
  name: string;
  ticker: string;
  decimals: number;
  balance: string;
  price: number;
  valueUsd: string;
  valueWegld: string;
  assets: {
    svgUrl: string;
  };
}
