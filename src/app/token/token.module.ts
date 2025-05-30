import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@/app/token/token.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [JwtService, TokenService],
  exports: [JwtService, TokenService],
})
export class TokenModule {}
