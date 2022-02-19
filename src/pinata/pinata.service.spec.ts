import { Test, TestingModule } from '@nestjs/testing';
import { PinataService } from './pinata.service';

describe('PinataService', () => {
  let service: PinataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinataService],
    }).compile();

    service = module.get<PinataService>(PinataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
