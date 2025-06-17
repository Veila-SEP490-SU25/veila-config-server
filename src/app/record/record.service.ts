import { ProfileService } from '@/app/profile/profile.service';
import { CreateRecordRequest, UpdateRecordRequest } from '@/app/record/record.dto';
import { Record } from '@/common/models';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly profileService: ProfileService,
  ) {}

  async getRecordsByProfileSecret(secret: string): Promise<Record[]> {
    const profile = await this.profileService.getProfileBySecret(secret);
    const records = await this.recordRepository.find({
      where: { profileId: profile.id },
      order: { createdAt: 'ASC' },
    });
    return records;
  }

  async createRecord(secret: string, body: CreateRecordRequest): Promise<Record> {
    const profile = await this.profileService.getProfileBySecret(secret);
    const existingRecord = await this.recordRepository.findOne({
      where: { key: body.key, profileId: profile.id },
    });
    if (existingRecord) {
      throw new BadRequestException('Record with this key already exists');
    }
    const record = this.recordRepository.create({
      key: body.key,
      value: body.value,
      profileId: profile.id,
    });
    return await this.recordRepository.save(record);
  }

  async deleteRecord(secret: string, key: string): Promise<Record> {
    const profile = await this.profileService.getProfileBySecret(secret);
    const record = await this.recordRepository.findOne({
      where: { key, profileId: profile.id },
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return await this.recordRepository.remove(record);
  }

  async updateRecord(secret: string, body: UpdateRecordRequest): Promise<Record> {
    const profile = await this.profileService.getProfileBySecret(secret);
    const record = await this.recordRepository.findOne({
      where: { key: body.key, profileId: profile.id },
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    record.key = body.key;
    record.value = body.value;
    return await this.recordRepository.save(record);
  }
}
