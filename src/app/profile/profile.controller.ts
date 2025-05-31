import { CreateProfileRequest } from '@/app/profile/profile.dto';
import { ProfileService } from '@/app/profile/profile.service';
import { UserId } from '@/common/decorators';
import { AuthGuard } from '@/common/guards';
import { ItemResponse, ListResponse, Profile } from '@/common/models';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile Controller')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiQuery({
    name: 'pageIndex',
    required: false,
    type: Number,
    description: 'Page index for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  async getAllProfiles(
    @UserId() userId: string,
    @Query('pageIndex', new DefaultValuePipe(1), ParseIntPipe)
    pageIndex: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<ListResponse<Profile>> {
    const [profiles, totalCount, totalPages, hasNextPage, hasPreviousPage] =
      await this.profileService.getProfileByUserId(userId, pageIndex, pageSize);
    return {
      statusCode: 200,
      pageIndex,
      pageSize,
      message: 'Đã lấy danh sách profile thành công',
      items: profiles,
      totalItems: totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  @Post()
  async createProfile(
    @UserId() userId: string,
    @Body() body: CreateProfileRequest,
  ): Promise<ItemResponse<Profile>> {
    const profile = await this.profileService.createProfile(userId, body);
    return {
      statusCode: 201,
      message: 'Tạo profile thành công',
      item: profile,
    };
  }

  @Put(':profileId')
  async updateProfileName(
    @UserId() userId: string,
    @Param('profileId') profileId: string,
    @Body() body: CreateProfileRequest,
  ): Promise<ItemResponse<Profile>> {
    const updatedProfile = await this.profileService.updateProfileName(
      userId,
      profileId,
      body,
    );
    return {
      statusCode: 200,
      message: 'Cập nhật tên profile thành công',
      item: updatedProfile,
    };
  }

  @Put(':profileId/secret')
  async changeProfileSecret(
    @UserId() userId: string,
    @Param('profileId') profileId: string,
  ): Promise<ItemResponse<Profile>> {
    const updatedProfile = await this.profileService.changeProfileSecret(
      userId,
      profileId,
    );
    return {
      statusCode: 200,
      message: 'Đổi secret profile thành công',
      item: updatedProfile,
    };
  }

  @Get(':profileId')
  async getProfileById(
    @UserId() userId: string,
    @Param('profileId') profileId: string,
  ): Promise<ItemResponse<Profile>> {
    const profile = await this.profileService.getProfileById(userId, profileId);
    return {
      statusCode: 200,
      message: 'Lấy thông tin profile thành công',
      item: profile,
    };
  }

  @Delete(':profileId')
  async deleteProfile(
    @UserId() userId: string,
    @Param('profileId') profileId: string,
  ): Promise<ItemResponse<boolean>> {
    const result = await this.profileService.deleteProfile(userId, profileId);
    return {
      statusCode: 200,
      message: 'Xoá profile thành công',
      item: result,
    };
  }
}
