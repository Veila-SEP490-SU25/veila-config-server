import { SeedService } from '@/app/seed/seed.service';
import { UserModule } from '@/app/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  providers: [SeedService],
})
export class SeedModule {}
