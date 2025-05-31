import { ApiProperty } from "@nestjs/swagger";

export class ItemResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  item: T;
}

export class ListResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  items: T[];

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;
}

export class ErrorResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}