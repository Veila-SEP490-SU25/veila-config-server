import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/app/user/user.service';
import { User } from '@/common/models';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
