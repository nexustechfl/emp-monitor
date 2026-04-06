import { Module } from '@nestjs/common';
import { AuthService } from './utils/auth.service';
import { CryptoService } from './utils/crypto.service';
import { JWTService } from './utils/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({ config: { host: process.env.REDIS_HOST || 'localhost', port: 6379, password: process.env.REDIS_PASSWORD } })
  ],
  providers: [CryptoService, JWTService, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
