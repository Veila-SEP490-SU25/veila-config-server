import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { ShopVeilaModel } from './shop.veila.model';
import { LicenseImageVeilaModel } from './licenseImage.veila.model';

export enum LicenseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

@Entity({ name: 'licenses' })
export class LicenseVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'License title',
    example: 'Business Operation License 2025',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'License description',
    example: 'Official business operation license for the year 2025',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'License status',
    enum: LicenseStatus,
    example: LicenseStatus.ACTIVE,
  })
  @Column({ type: 'enum', enum: LicenseStatus, default: LicenseStatus.INACTIVE })
  status: LicenseStatus;

  @ApiProperty({
    description: 'License start date',
    example: '2025-01-01',
  })
  @Column({ type: 'date' })
  startDate: Date;

  @ApiProperty({
    description: 'License expiration date',
    example: '2025-12-31',
  })
  @Column({ type: 'date' })
  expirationDate: Date;

  @ApiProperty({
    description: 'License number or identifier',
    example: 'LIC-2025-001',
  })
  @Column({ type: 'varchar', length: 50 })
  licenseNumber: string;

  @ApiProperty({
    description: 'The shop this license belongs to',
    type: () => ShopVeilaModel,
  })
  @OneToOne(() => ShopVeilaModel, (shop) => shop.license)
  @JoinColumn({ name: 'shop_id' })
  shop: ShopVeilaModel;

  @ApiProperty({
    description: 'Images of the license document',
    type: () => [LicenseImageVeilaModel],
  })
  @OneToMany(() => LicenseImageVeilaModel, (image) => image.license)
  licenseImages: LicenseImageVeilaModel[];
}
