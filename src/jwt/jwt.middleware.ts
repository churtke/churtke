import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { TOKEN_HEADER_KEY, TOKEN_PREFIX } from './jwt.constant';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (TOKEN_HEADER_KEY in req.headers || TOKEN_HEADER_KEY in req.query) {
      const token = req.headers[TOKEN_HEADER_KEY]
        ? req.headers[TOKEN_HEADER_KEY].replace(TOKEN_PREFIX, '').trim()
        : req.query[TOKEN_HEADER_KEY];

      const decoded = await this.jwtService.verify(token.toString());

      const user = await this.userService.findById(decoded['userId']);

      if (!user) throw new UnauthorizedException();

      req['user'] = user;
    }

    next();
  }
}
