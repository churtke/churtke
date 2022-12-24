import { QueryOptions } from 'mongoose';
import { FilterWrapper } from 'src/common/filter/filter-wrapper';
import { FilterUsersInput } from '../dto/get-users.dto';

export class UserFilter extends FilterWrapper {
  constructor(private input: FilterUsersInput, public accessFilters: any) {
    super(
      {
        name: 'query-filter',
        filter: (fq: any) => {
          if (input.q) {
            fq['$or'] = [
              { fullname: new RegExp(`.*${input.q}.*`, 'gi') },
              { phone: new RegExp(`.*${input.q}.*`, 'gi') },
            ];
          }
        },
      },
      {
        name: 'role-filter',
        filter: (fq: any) => {
          if (input._role) {
            fq['_role'] = input._role;
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
