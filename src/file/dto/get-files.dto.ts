import { CoreOutput } from 'src/common/dto/output.dto';
import { File } from '../file.entity';
import { FilterOptions } from 'src/common/dto/filter-options';
import { PaginationOutput } from 'src/common/dto/pagination.dto';

export class GetFilesInput extends FilterOptions {
  q?: string;
}

export class GetFilesOutput extends CoreOutput {
  files?: File[];

  pagination: PaginationOutput;
}
