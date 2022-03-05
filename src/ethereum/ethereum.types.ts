import { ContractInterface } from 'ethers';

export type EthersContract = {
  contractAddress: string;
  abi: ContractInterface;
};
