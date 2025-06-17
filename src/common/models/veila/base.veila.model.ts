import { ApiProperty } from '@nestjs/swagger';
import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the model instance',
  })
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2023-10-01T12:00:00Z',
    description: 'Timestamp when the model instance was created',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2023-10-01T12:00:00Z',
    description: 'Timestamp when the model instance was last updated',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;
}
