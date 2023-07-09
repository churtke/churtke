import { FilterItem } from './filter-item';
import { FilterOptions } from './filter-options';

export class FilterWrapper {
  filterItems: FilterItem[];

  constructor(...items: FilterItem[]) {
    this.filterItems = items;
  }

  getOptions(input: FilterOptions): object {
    const { limit = 10, page = 1, sort = '-createdAt' } = input;

    const sortItems = sort.replace(' ', '').split(',');

    const order = {};
    for (let item of sortItems) {
      if (item[0] === '-') {
        item = item.replace('-', '');

        order[item] = 'DESC';
      } else {
        order[item] = 'ASC';
      }
    }

    return {
      take: limit,
      skip: limit * page - limit,
      order,
    };
  }

  getFilters(): object {
    const filterQuery = {};

    this.filterItems.forEach((fi) => {
      if (!fi.filter) return;

      if (typeof fi.filter === 'string') {
        filterQuery[fi.name] = fi.filter;
      } else {
        fi.filter(filterQuery);
      }
    });

    return filterQuery;
  }
}
