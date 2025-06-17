import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { UserVeilaModel } from './user.veila.model';
import { LicenseVeilaModel } from './license.veila.model';
import { PolicyVeilaModel } from './policy.veila.model';

export enum ShopStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

@Entity({ name: 'shops' })
export class ShopVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'Shop name - must be unique',
    example: 'My Awesome Shop',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({
    description: 'Tax code of the shop',
    example: '0123456789',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  taxCode: string;

  @ApiProperty({
    description: 'Shop address',
    example: '123 Trading Street, Business District, City',
  })
  @Column({ type: 'varchar', length: 500 })
  address: string;

  @ApiProperty({
    description: 'Shop contact phone number',
    example: '+84123456789',
  })
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ApiProperty({
    description: 'Shop status',
    enum: ShopStatus,
    example: ShopStatus.ACTIVE,
  })
  @Column({ type: 'enum', enum: ShopStatus, default: ShopStatus.INACTIVE })
  status: ShopStatus;

  @ApiProperty({
    description: 'Shop description',
    example: 'We sell high-quality products at affordable prices',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'URL to shop logo image',
    example: 'https://storage.example.com/shops/logos/shop123.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  logoUrl?: string;

  @ApiProperty({
    description: 'URL to shop cover image',
    example: 'https://storage.example.com/shops/covers/shop123.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  coverImageUrl?: string;

  @ApiProperty({
    description: 'Whether the shop has been verified by admin',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'The user who owns this shop',
    type: () => UserVeilaModel,
  })
  @ManyToOne(() => UserVeilaModel, (user) => user.shops)
  @JoinColumn({ name: 'owner_id' })
  user: UserVeilaModel;

  @ApiProperty({
    description: "The shop's business license",
    type: () => LicenseVeilaModel,
  })
  @OneToOne(() => LicenseVeilaModel, (license) => license.shop)
  license: LicenseVeilaModel;

  @ApiProperty({
    description: 'Policies agreed to by the shop',
    type: () => [PolicyVeilaModel],
  })
  @OneToMany(() => PolicyVeilaModel, (policy) => policy.shop)
  policies: PolicyVeilaModel[];
}
