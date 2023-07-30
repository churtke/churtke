import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../product.entity';
import { File } from 'src/file/file.entity';

export class AddProductInput {
  title: string;
  description: string;
  price: number;
  quantity: number;
  picture: File;
}

export class AddProductOutput extends CoreOutput {
  product?: Product;
}
