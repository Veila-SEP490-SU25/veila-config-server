import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRecordRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên bản ghi không được để trống' })
  key: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Giá trị bản ghi không được để trống' })
  value: string;
}

export class UpdateRecordRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên bản ghi không được để trống' })
  key: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Giá trị bản ghi không được để trống' })
  value: string;
}

export class DeleteRecordRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên bản ghi không được để trống' })
  key: string;
}
