import { PasswordService } from '@/app/password';
import { CreateProfileRequest } from '@/app/profile/profile.dto';
import { Profile } from '@/common/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly passwordService: PasswordService,
  ) {}

  async getProfileByUserId(
    userId: string,
    pageIndex: number = 1,
    pageSize: number = 10,
  ): Promise<[Profile[], number, number, boolean, boolean]> {
    const [profiles, totalCount] = await this.profileRepository.findAndCount({
      where: { userId },
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = pageIndex < totalPages;
    const hasPreviousPage = pageIndex > 1;
    return [profiles, totalCount, totalPages, hasNextPage, hasPreviousPage];
  }

  async createProfile(
    userId: string,
    body: CreateProfileRequest,
  ): Promise<Profile> {
    const profile = this.profileRepository.create({
      userId,
      name: body.name,
      secret: this.passwordService.generateSecretKey(),
    });
    return await this.profileRepository.save(profile);
  }

  async changeProfileSecret(
    userId: string,
    profileId: string,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId, userId },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    profile.secret = this.passwordService.generateSecretKey();
    return await this.profileRepository.save(profile);
  }

  async getProfileById(userId: string, profileId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId, userId },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
