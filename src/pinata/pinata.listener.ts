import { ForbiddenException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PinataService } from './pinata.service';
import { PINATA_EVENT } from '../common/events/pinata.event';
import { CreateJsonToIpfsDto } from './dto/create.json-to-ipfs.dto';
import * as FormData from 'form-data';

@Injectable()
export class PinataListener {
  constructor(private readonly pinataService: PinataService) {}

  @OnEvent(PINATA_EVENT.JSON_TO_IPFS)
  async jsonToIpfs(accountAddress: string, data: CreateJsonToIpfsDto) {
    try {
      const response = await this.pinataService.jsonToIpfs(
        accountAddress,
        data,
      );

      return response.data;
    } catch (e) {
      throw new ForbiddenException('IPFS 업로드 중 문제가 발생했습니다.');
    }
  }

  @OnEvent(PINATA_EVENT.FILE_TO_IPFS)
  async fileToIpfs(formData: FormData) {
    console.log('Call fileToIpfs');
    try {
      const response = await this.pinataService.fileToIpfs(formData);

      return response.data;
    } catch (e) {
      throw new ForbiddenException('IPFS 업로드 중 문제가 발생했습니다.');
    }
  }
}
