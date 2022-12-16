import { QueryOptions } from 'mongoose';
import { FilterItem } from './filter-item';
import { FilterOptions } from './filter-options';

export class FilterWrapper {
  filterItems: FilterItem[];

  constructor(...filterItems: FilterItem[]) {
    this.filterItems = filterItems;
  }

  getQueryOptions(filterOptions: FilterOptions): QueryOptions {
    const { limit, page, sort } = filterOptions;

    return {
      limit: limit,
      skip: (page - 1) * limit,
      sort: sort,
    };
  }

  getFilterQuery(accessFilters: any = null): object {
    const filterQuery = {};

    this.filterItems.forEach((fi) => {
      if (!fi.filter) return;

      if (typeof fi.filter === 'string') {
        filterQuery[fi.name] = fi.filter;
      } else {
        fi.filter(filterQuery);
      }
    });

    if (!accessFilters) return filterQuery;

    const result = { ...filterQuery, ...accessFilters };

    if (filterQuery['$or'] && accessFilters['$or']) {
      result['$and'] = [
        { $or: filterQuery['$or'] },
        { $or: accessFilters['$or'] },
      ];
    }

    return result;
  }
}
