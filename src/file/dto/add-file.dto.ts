import { CoreOutput } from 'src/common/dto/output.dto';
import { File } from '../file.entity';

export class AddFileOutput extends CoreOutput {
  file?: File;
}
