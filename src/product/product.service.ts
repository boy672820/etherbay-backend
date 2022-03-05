import { Inject, Injectable } from '@nestjs/common';
import { Contract } from 'ethers';
import { MintResponse } from './product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ETHERBAY_PRODUCT_CONTRACT') private readonly contract: Contract,
  ) {}

  async mint(recipient: string, tokenUri: string): Promise<MintResponse> {
    const tx = await this.contract.mint(recipient, tokenUri);
    const receipt = await tx.wait();
    const transactionHash = receipt.transactionHash;
    const tokenId = receipt.events[0].args[2].toString();

    return { transactionHash, tokenId };
  }
}
