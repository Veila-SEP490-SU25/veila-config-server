import { ProfileModule } from '@/app/profile/profile.module';
import { RecordController } from '@/app/record/record.controller';
import { RecordService } from '@/app/record/record.service';
import { Record } from '@/common/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), ProfileModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
