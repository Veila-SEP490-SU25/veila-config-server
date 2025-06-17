import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/common/models';
import { Repository } from 'typeorm';
import { UpdatePasswordRequest } from '@/app/user/user.dto';
import { PasswordService } from '@/app/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async changePassword(userId: string, body: UpdatePasswordRequest): Promise<boolean> {
    const user = await this.getById(userId);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }
    const isCurrentPasswordValid = await this.passwordService.comparePassword(
      body.oldPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Mật khẩu hiện tại không chính xác.');
    }
    const isNewPasswordSameAsOld = await this.passwordService.comparePassword(
      body.newPassword,
      user.password,
    );
    if (isNewPasswordSameAsOld) {
      throw new BadRequestException('Mật khẩu mới không được trùng với mật khẩu cũ.');
    }
    const newHashedPassword = await this.passwordService.hashPassword(body.newPassword);
    user.password = newHashedPassword;
    await this.userRepository.save(user);
    return true;
  }
}
