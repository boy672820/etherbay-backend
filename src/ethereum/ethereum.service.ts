import { Inject, Injectable } from '@nestjs/common';
import { Contract, ethers, Wallet } from 'ethers';
import { EthersContract } from './ethereum.types';

@Injectable()
export class EthereumService {
  constructor(@Inject('SIGNER') private readonly signer: Wallet) {}

  /**
   * 소유자 주소로 서명 컨트랙트 생성
   * @param {EthersContract} {contractAddress, abi} 컨트랙트 주소, ABI
   * @returns
   */
  contract({ contractAddress, abi }: EthersContract): Contract {
    const contract = new ethers.Contract(contractAddress, abi, this.signer);

    return contract;
  }
}
