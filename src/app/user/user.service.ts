import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/common/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }
}
