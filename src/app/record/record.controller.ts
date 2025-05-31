import {
  CreateRecordRequest,
  DeleteRecordRequest,
  UpdateRecordRequest,
} from '@/app/record/record.dto';
import { RecordService } from '@/app/record/record.service';
import { Sercret } from '@/common/decorators';
import { ItemResponse, ListResponse, Record } from '@/common/models';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

@Controller('record')
@ApiTags('Record Controller')
@ApiHeaders([
  {
    name: 'X-Secret-Key',
    description: 'Secret key for authentication',
    required: true,
  },
])
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async getRecordsByProfileSecret(
    @Sercret() secret: string,
  ): Promise<ListResponse<Record>> {
    const records = await this.recordService.getRecordsByProfileSecret(secret);
    return {
      statusCode: 200,
      message: 'Records retrieved successfully',
      items: records,
      totalItems: records.length,
      totalPages: 1, // Assuming all records fit in one page
      hasNextPage: false,
      hasPreviousPage: false,
      pageIndex: 1,
      pageSize: records.length,
    };
  }

  @Post()
  async createRecord(
    @Sercret() secret: string,
    @Body() body: CreateRecordRequest,
  ): Promise<ItemResponse<Record>> {
    const record = await this.recordService.createRecord(secret, body);
    return {
      statusCode: 201,
      message: 'Record created successfully',
      item: record,
    };
  }

  @Put()
  async updateRecord(
    @Sercret() secret: string,
    @Body() body: UpdateRecordRequest,
  ): Promise<ItemResponse<Record>> {
    const record = await this.recordService.updateRecord(secret, body);
    return {
      statusCode: 200,
      message: 'Record updated successfully',
      item: record,
    };
  }

  @Delete()
  async deleteRecord(
    @Sercret() secret: string,
    @Body() body: DeleteRecordRequest,
  ): Promise<ItemResponse<Record>> {
    const record = await this.recordService.deleteRecord(secret, body.key);
    return {
      statusCode: 200,
      message: 'Record deleted successfully',
      item: record,
    };
  }
}
