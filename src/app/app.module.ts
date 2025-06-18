import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingMiddleware } from '@/common/middlewares';
import { TokenModule } from '@/app/token';
import { UserModule } from '@/app/user';
import { AuthModule } from '@/app/auth';
import { PasswordModule } from '@/app/password';
import { SeedModule } from '@/app/seed';
import { ProfileModule } from '@/app/profile';
import { RecordModule } from '@/app/record';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.model{.ts,.js}'],
        migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
        synchronize: false,
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    TokenModule,
    UserModule,
    AuthModule,
    PasswordModule,
    SeedModule,
    ProfileModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('');
  }
}
