import { IsPassword } from '@/common/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPassword()
  password: string;

  @ApiProperty()
  @IsOptional()
  fullName?: string;
}

export class RegisterResponse {
  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName?: string;
}