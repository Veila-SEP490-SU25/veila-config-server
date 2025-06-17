import { IsPassword } from '@/common/validators';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordRequest {
  @ApiProperty()
  @IsPassword()
  oldPassword: string;

  @ApiProperty()
  @IsPassword()
  newPassword: string;
}
