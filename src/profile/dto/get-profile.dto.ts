import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/user.entity';

export class GetProfileOutput extends CoreOutput {
  user: User;
}
