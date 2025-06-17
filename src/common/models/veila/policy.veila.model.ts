import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { ShopVeilaModel } from './shop.veila.model';

export enum PolicyStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

@Entity({ name: 'policies' })
export class PolicyVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'Title of the policy',
    example: 'Terms of Service 2025',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Content of the policy agreement',
    example: 'By accepting this agreement, the shop agrees to...',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Version of the policy',
    example: '1.0.0',
  })
  @Column({ type: 'varchar', length: 50 })
  version: string;

  @ApiProperty({
    description: 'Status of the policy acceptance',
    enum: PolicyStatus,
    example: PolicyStatus.PENDING,
  })
  @Column({ type: 'enum', enum: PolicyStatus, default: PolicyStatus.PENDING })
  status: PolicyStatus;

  @ApiProperty({
    description: 'Date when the policy was accepted by the shop',
    example: '2025-06-17T10:00:00Z',
    nullable: true,
  })
  @Column({ type: 'datetime', nullable: true })
  acceptedAt?: Date;

  @ApiProperty({
    description: 'Date when the policy expires',
    example: '2026-06-17T10:00:00Z',
    nullable: true,
  })
  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @ApiProperty({
    description: 'Notes or comments about the policy acceptance',
    example: 'Accepted during shop registration',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'The shop this policy belongs to',
    type: () => ShopVeilaModel,
  })
  @ManyToOne(() => ShopVeilaModel, (shop) => shop.policies)
  @JoinColumn({ name: 'shop_id' })
  shop: ShopVeilaModel;
}
