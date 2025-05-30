import { LoginRequest, LoginResponse } from '@/app/auth/auth.dto';
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
      message: 'Login successful',
      statusCode: 200,
    };
  }
}
