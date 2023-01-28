import BigNumber from 'bignumber.js';

export class TierDetails {
  name!: string;
  minVolume!: BigNumber;
  feePercent!: number;

  constructor(init?: Partial<TierDetails>) {
    Object.assign(this, init);
  }

  static fromResponse(response: any): TierDetails {
    return new TierDetails({
      name: response.name,
      minVolume: new BigNumber(response.minVolume),
      feePercent: response.freePercent
    });
  }
}
