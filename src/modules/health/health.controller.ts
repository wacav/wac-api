import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '../decorator/auth.decorator';
import { RedisService } from '../redis/redis.service';

@ApiTags('Health')
@Controller('/health')
export class HealthController {
  constructor(private readonly redisService: RedisService) {}
  @Get()
  async healthCheck() {
    return 'OK';
  }

  @JwtAuth
  @Get('/jwt/ping')
  jwtPing() {
    return 'OK';
  }

  @Get('/redis')
  async redis() {
    await this.redisService.set('hi3', 'bye');
    return this.redisService.get('hi');
  }
}
