import { Raw } from 'typeorm';
import { GetFilesInput } from './dto/get-files.dto';
import { FilterWrapper } from 'src/common/filter/filter-wrapper';

export class FileFilter extends FilterWrapper {
  constructor(private input: GetFilesInput) {
    super({
      name: 'query',
      filter: (fq) => {
        if (input.q) {
          fq['filename'] = Raw((alias) => `${alias} ILIKE '%${input.q}%'`);
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
