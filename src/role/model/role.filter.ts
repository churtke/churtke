import { QueryOptions } from 'mongoose';
import { FilterWrapper } from 'src/common/filter/filter-wrapper';
import { FilterRolesInput } from '../dto/get-roles.dto';

export class RoleFilter extends FilterWrapper {
  constructor(private input: FilterRolesInput, public accessFilters: any) {
    super({
      name: 'query-filter',
      filter: (fq: any) => {
        if (input.q) {
          fq['$or'] = [{ title: new RegExp(`.*${input.q}.*`, 'gi') }];
        }
      },
    });
  }

  getFilterQuery(): object {
    return super.getFilterQuery(this.accessFilters);
  }

  getQueryOptions(): QueryOptions {
    return super.getQueryOptions(this.input);
  }
}
