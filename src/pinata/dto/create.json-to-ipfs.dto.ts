import { attribute } from '../../common/types/product.type';

export class CreateJsonToIpfsDto {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly attributes: attribute[];
}
