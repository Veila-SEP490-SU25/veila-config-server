import { Injectable } from '@nestjs/common';
import { TokenService } from '@/app/token';
import { UserService } from '@/app/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}


}
