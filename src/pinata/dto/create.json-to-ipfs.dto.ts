import { attribute } from '../type/attributes.type';

export class CreateJsonToIpfsDto {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly attributes: attribute[];
}
