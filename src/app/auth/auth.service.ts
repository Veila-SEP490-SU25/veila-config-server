import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from '@/app/token';
import { UserService } from '@/app/user';
import { LoginRequest, LoginResponse } from '@/app/auth/auth.dto';
import { PasswordService } from '@/app/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(body: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.getByUsername(body.username);
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại.');
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      body.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu không chính xác.');
    }
    const accessToken = await this.tokenService.createToken(user);
    const refreshToken = await this.tokenService.createToken(user, {
      isRefresh: true,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
