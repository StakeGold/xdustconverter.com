import BigNumber from 'bignumber.js';

export const computeValueAfterFees = (
  value: BigNumber,
  protocolFee: number,
  slippage: number
): BigNumber => {
  let totalAfterFees = new BigNumber(value);

  const totalProtocolFee = new BigNumber(protocolFee / 100).multipliedBy(
    totalAfterFees
  );
  totalAfterFees = value.minus(totalProtocolFee);

  const totalSlippage = new BigNumber(slippage).multipliedBy(totalAfterFees);
  totalAfterFees = totalAfterFees
    .minus(totalSlippage)
    .decimalPlaces(18, BigNumber.ROUND_DOWN);

  return totalAfterFees;
};
