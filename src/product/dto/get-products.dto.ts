import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../product.entity';
import { FilterOptions } from 'src/common/dto/filter-options';
import { PaginationOutput } from 'src/common/dto/pagination.dto';

export class GetProductsInput extends FilterOptions {
  q?: string;
}

export class GetProductsOutput extends CoreOutput {
  products?: Product[];

  pagination: PaginationOutput;
}
