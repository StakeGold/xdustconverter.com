export interface SwapDustTokensArgs {
  totalWegld: string;
  tokens: TokenArgs;
  referralTag?: string;
}

export interface TokenArgs {
  identifier: string;
  amount: string;
}
