import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { ApiProperty } from '@nestjs/swagger';
import { IdentifierImageVeilaModel } from './identifierImage.veila.model';
import { ShopVeilaModel } from './shop.veila.model';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  SHOP = 'SHOP',
  CUSTOMER = 'CUSTOMER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

@Entity({ name: 'users' })
export class UserVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({
    description: 'Hashed password',
    example: '$2b$10$...',
    writeOnly: true,
  })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @ApiProperty({
    description: 'User middle name',
    example: 'Smith',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  middleName: string | null;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+84123456789',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St, City, Country',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string | null;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-01-01',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  birthDate: Date | null;

  @ApiProperty({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatars/user.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  avatarUrl: string | null;

  @ApiProperty({
    description: 'URL to user cover image',
    example: 'https://example.com/covers/user.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  coverUrl: string | null;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    example: UserRole.CUSTOMER,
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @ApiProperty({
    description: 'User account status',
    enum: UserStatus,
    example: UserStatus.INACTIVE,
  })
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @ApiProperty({
    description: 'Whether the user email is verified',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'Whether the user identity is verified',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isIdentified: boolean;

  @ApiProperty({
    description: 'Identifier images uploaded by the user',
    type: () => [IdentifierImageVeilaModel],
  })
  @OneToMany(() => IdentifierImageVeilaModel, (identifierImage) => identifierImage.user)
  identifierImages: IdentifierImageVeilaModel[];

  @ApiProperty({
    description: 'Shops owned by the user',
    type: () => [ShopVeilaModel],
  })
  @OneToMany(() => ShopVeilaModel, (shop) => shop.user)
  shops: ShopVeilaModel[];
}
