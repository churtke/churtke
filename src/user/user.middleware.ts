import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TOKEN_HEADER_KEY, TOKEN_PREFIX } from 'src/common/jwt/jwt.constant';
import { JwtService } from 'src/common/jwt/jwt.service';
import { UserService } from './user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (TOKEN_HEADER_KEY in req.headers) {
      const token = req.headers[TOKEN_HEADER_KEY].toString()
        .replace(TOKEN_PREFIX, '')
        .trim();

      const decoded = await this.jwtService.verify(token);

      const user = await this.userService.findById(Number(decoded?.userId));

      if (!user) throw new UnauthorizedException();

      req['user'] = user;
    }

    next();
  }
}
