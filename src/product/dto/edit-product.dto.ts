import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../product.entity';
import { File } from 'src/file/file.entity';

export class EditProductInput {
  title: string;
  description: string;
  price: number;
  quantity: number;
  picture: File;
}

export class EditProductOutput extends CoreOutput {
  product?: Product;
}
