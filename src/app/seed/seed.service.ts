import { PasswordService } from '@/app/password';
import { UserService } from '@/app/user';
import { User } from '@/common/models';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    const adminUsername = this.config.get<string>('ADMIN_USERNAME');
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD');

    if (!adminUsername || !adminPassword) {
      console.warn('Admin credentials are not set in the environment variables.');
      return;
    }

    const existingUser = await this.userService.getByUsername(adminUsername);
    if (existingUser) {
      Logger.log(`Admin user with username "${adminUsername}" already exists.`, 'SeedService');
      return;
    }

    const hashedPassword = await this.passwordService.hashPassword(adminPassword);
    await this.userService
      .create({
        username: adminUsername,
        password: hashedPassword,
        code: new Date().getTime().toString(),
      } as User)
      .then(() => {
        Logger.log('Admin user created successfully.', 'SeedService');
      });
  }
}
