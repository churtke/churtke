import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/user.entity';

export class EditProfileInput {
  name: string;
}

export class EditProfileOutput extends CoreOutput {
  user?: User;
}
