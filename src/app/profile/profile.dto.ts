import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfileRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên hồ sơ không được để trống' })
  name: string;
}

export class UpdateProfileRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên hồ sơ không được để trống' })
  name: string;
}
