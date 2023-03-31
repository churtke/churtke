import { CountryCode } from 'libphonenumber-js';
import { CoreOutput } from 'src/common/dto/output.dto';

export class SendCodeInput {
  region: CountryCode;

  phone: string;
}

export class SendCodeOutput extends CoreOutput {}
