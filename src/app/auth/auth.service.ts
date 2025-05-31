import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from '@/app/token';
import { UserService } from '@/app/user';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterRequest,
  RegisterResponse,
} from '@/app/auth/auth.dto';
import { PasswordService } from '@/app/password';
import { User } from '@/common/models';

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

  async register(body: RegisterRequest): Promise<RegisterResponse> {
    const existingUser = await this.userService.getByUsername(body.username);
    if (existingUser) {
      throw new BadRequestException('Tài khoản đã tồn tại.');
    }
    const hashedPassword = await this.passwordService.hashPassword(
      body.password,
    );
    const newUser = await this.userService.create({
      username: body.username,
      password: hashedPassword,
      fullName: body.fullName,
    } as User);
    return {
      username: newUser.username,
      fullName: newUser.fullName,
    };
  }

  async refresh(body: RefreshTokenRequest): Promise<LoginResponse> {
    const payload = await this.tokenService.validateToken(body.refreshToken, {
      isRefresh: true,
    });
    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }
    const accessToken = await this.tokenService.createToken(user);
    return {
      accessToken,
      refreshToken: body.refreshToken, // Return the same refresh token
    };
  }
}
