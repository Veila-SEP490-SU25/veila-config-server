import { UpdatePasswordRequest } from '@/app/user/user.dto';
import { UserService } from '@/app/user/user.service';
import { UserId } from '@/common/decorators';
import { AuthGuard } from '@/common/guards';
import { ItemResponse, User } from '@/common/models';
import { Body, Controller, Get, NotFoundException, Put, UseGuards } from '@nestjs/common';
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

  @Get('self')
  async getSelf(@UserId() userId: string): Promise<ItemResponse<User>> {
    const user = await this.userService.getById(userId);
    if (!user) throw new NotFoundException('Người dùng không tồn tại.');
    return {
      statusCode: 200,
      item: user,
      message: 'Lấy thông tin người dùng thành công.',
    };
  }
}
