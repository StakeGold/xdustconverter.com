import {
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Address
} from '@multiversx/sdk-core/out';
import { CONTRACT_ADDRESS } from 'config';
import json from 'dust-converter.abi.json';

const abiRegistry = AbiRegistry.create(json);
const abi = new SmartContractAbi(abiRegistry);

export const dustSmartContract = new SmartContract({
  address: new Address(CONTRACT_ADDRESS),
  abi
});
