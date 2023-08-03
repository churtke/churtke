import { Raw } from 'typeorm';
import { FilterWrapper } from 'src/common/filter/filter-wrapper';
import { GetProductsInput } from './dto/get-products.dto';

export class ProductFilter extends FilterWrapper {
  constructor(private input: GetProductsInput) {
    super({
      name: 'query',
      filter: (fq) => {
        if (input.q) {
          fq['title'] = Raw((alias) => `${alias} ILIKE '%${input.q}%'`);
        }
      },
    });
  }

  getOptions(): object {
    return super.getOptions(this.input);
  }

  getFilters(): object {
    return super.getFilters();
  }
}
