import { attribute } from '../../common/types/product.type';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly attributes: attribute[];
}
