import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateJsonToIpfsDto } from './dto/create.json-to-ipfs.dto';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PinataService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async jsonToIpfs(
    accountAddress: string,
    pinataContent: CreateJsonToIpfsDto,
  ): Promise<any> {
    const keyvalues = {
      name: pinataContent.name,
      accountAddress,
    };

    pinataContent.attributes.forEach((attribute) => {
      Object.assign(keyvalues, { [attribute.trait_type]: attribute.value });
    });

    const data = {
      pinataMetadata: {
        name: 'etherbay-product',
        keyvalues,
      },
      pinataContent,
    };

    const response = await firstValueFrom(
      this.httpService.post('/pinning/pinJSONToIPFS', data),
    );

    return response;
  }

  async fileToIpfs(formData: FormData): Promise<any> {
    const data = await firstValueFrom(
      this.httpService.post('/pinning/pinFileToIPFS', formData, {
        maxContentLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        },
      }),
    );

    return data;
  }

  async getIpfs(ipfsHash: string): Promise<any> {
    try {
      const baseURL = this.configService.get<string>('ipfs.gatewayUrl');
      console.log(`${baseURL}/ipfs/${ipfsHash}`);
      const response: { data: any } = await firstValueFrom(
        this.httpService.get(`/ipfs/${ipfsHash}`, { baseURL }),
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async test(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/data/testAuthentication'),
      );

      return response;
    } catch (e) {
      throw e;
    }
  }
}
