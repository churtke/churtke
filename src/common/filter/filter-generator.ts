import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterGenerator {
  async generate(filters): Promise<any> {
    if (filters['sort']) {
      filters['sort'] = filters['sort'].replace('disabled ', '');
    }

    return filters;
  }
}
