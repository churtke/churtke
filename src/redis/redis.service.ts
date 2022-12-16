import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisKey, Result, ClientContext } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(this.configService.get<string>('REDIS_URI'));
  }

  private client: Redis;

  async set(
    key: RedisKey,
    value: string,
    ttl: number,
  ): Promise<Result<'OK', ClientContext>> {
    return this.client.set(key, value, 'EX', ttl);
  }

  async get(key: RedisKey): Promise<Result<string | null, ClientContext>> {
    return this.client.get(key);
  }

  async del(key: RedisKey): Promise<Result<number, ClientContext>> {
    return this.client.del(key);
  }
}
