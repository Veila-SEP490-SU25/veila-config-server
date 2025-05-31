import { UpdatePasswordRequest } from '@/app/user/user.dto';
import { UserService } from '@/app/user/user.service';
import { UserId } from '@/common/decorators';
import { AuthGuard } from '@/common/guards';
import { ItemResponse } from '@/common/models';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User Controller')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('change-password')
  async changePassword(
    @Body() body: UpdatePasswordRequest,
    @UserId() userId: string,
  ): Promise<ItemResponse<boolean>> {
    const result = await this.userService.changePassword(userId, body);
    return {
      statusCode: 200,
      item: result,
      message: 'Đổi mật khẩu thành công.',
    };
  }
}
