import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateJsonToIpfsDto } from './dto/create.json-to-ipfs.dto';
import * as FormData from 'form-data';

@Injectable()
export class PinataService {
  constructor(private readonly httpService: HttpService) {}

  async jsonToIpfs(
    accountAddress: string,
    pinataContent: CreateJsonToIpfsDto,
  ): Promise<any> {
    const data = {
      pinataMetadata: {
        name: 'product',
        keyvalues: { name: pinataContent.name, accountAddress },
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
