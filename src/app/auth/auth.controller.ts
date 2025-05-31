import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/app/auth/auth.dto';
import { AuthService } from '@/app/auth/auth.service';
import { ItemResponse } from '@/common/models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginRequest,
  ): Promise<ItemResponse<LoginResponse>> {
    const response = await this.authService.login(body);
    return {
      item: response,
      message: 'Đăng nhập thành công',
      statusCode: 200,
    };
  }

  @Post('register')
  async register(
    @Body() body: RegisterRequest,
  ): Promise<ItemResponse<RegisterResponse>> {
    const response = await this.authService.register(body);
    return {
      item: response,
      message: 'Đăng ký thành công',
      statusCode: 201,
    };
  }
}
