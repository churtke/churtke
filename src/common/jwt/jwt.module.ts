import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModuleOptions } from './jwt.interface';
import { JWT_CONFIG_OPTIONS } from './jwt.constant';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
