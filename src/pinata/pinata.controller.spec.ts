import { Test, TestingModule } from '@nestjs/testing';
import { PinataController } from './pinata.controller';

describe('PinataController', () => {
  let controller: PinataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinataController],
    }).compile();

    controller = module.get<PinataController>(PinataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
