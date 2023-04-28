import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export class DappConfig {
  environment!: EnvironmentsEnum;
  updateRefreshRate!: number;
  apiTimeout!: number;
  walletConnectV2ProjectId!: string;
  minAmount!: number;
  slippage!: number;
  rawValues: string[] = [];

  constructor(init?: Partial<DappConfig>) {
    Object.assign(this, init);
  }

  static fromResponse(response: any): DappConfig {
    return new DappConfig({
      environment:
        EnvironmentsEnum[response.environment as keyof typeof EnvironmentsEnum],
      updateRefreshRate: response.updateRefreshRate,
      apiTimeout: response.apiTimeout,
      walletConnectV2ProjectId: response.walletConnectV2ProjectId,
      minAmount: response.minAmount,
      slippage: response.slippage,
      rawValues: response.rawValues
    });
  }
}
