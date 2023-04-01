import { CountryCode } from 'libphonenumber-js';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/user.entity';

export class VerifyCodeInput {
  region: CountryCode;

  phone: string;

  code: string;
}

export class VerifyCodeOutput extends CoreOutput {
  accessToken?: string;

  refreshToken?: string;

  user?: User;
}
