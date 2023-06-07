import { CoreOutput } from 'src/common/dto/output.dto';
import { File } from '../file.entity';

export class GetFileOutput extends CoreOutput {
  file?: File;
}
