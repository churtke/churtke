import { QueryOptions } from 'mongoose';
import { FilterWrapper } from 'src/common/filter/filter-wrapper';
import { FilterProductsInput } from '../dto/get-products.dto';

export class ProductFilter extends FilterWrapper {
  constructor(private input: FilterProductsInput, public accessFilters: any) {
    super(
      {
        name: 'query-filter',
        filter: (fq: any) => {
          if (input.q) {
            fq['$or'] = [
              { title: new RegExp(`.*${input.q}.*`, 'gi') },
              { englishTitle: new RegExp(`.*${input.q}.*`, 'gi') },
            ];
          }
        },
      },
      {
        name: 'tag-filter',
        filter: (fq: any) => {
          if (input.tag) {
            fq['tags'] = input.tag;
          }
        },
      },
    );
  }

  getFilterQuery(): object {
    return super.getFilterQuery(this.accessFilters);
  }

  getQueryOptions(): QueryOptions {
    return super.getQueryOptions(this.input);
  }
}
