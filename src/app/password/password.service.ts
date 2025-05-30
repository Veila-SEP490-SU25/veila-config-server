import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private readonly config: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.config.get<string>('PASSWORD_SALT_ROUNDS') || '10',
      10,
    );
    if (isNaN(saltRounds)) {
      throw new Error('Invalid salt rounds value. It must be a number.');
    }
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
