import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../product.entity';

export class GetProductOutput extends CoreOutput {
  product?: Product;
}
