import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PinataService {
  constructor(private readonly httpService: HttpService) {}

  async test(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/testAuthentication'),
      );

      return response;
    } catch (e) {
      throw e;
    }
  }
}
