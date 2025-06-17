import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { UserVeilaModel } from './user.veila.model';

export enum IdentifierDocumentType {
  CITIZEN_ID = 'CITIZEN_ID', // Căn cước công dân
  DRIVING_LICENSE = 'DRIVING_LICENSE', // Giấy phép lái xe
}

@Entity({ name: 'identifier_images' })
export class IdentifierImageVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'Image URL for the identifier document',
    example: 'https://storage.example.com/identifiers/user123/front.jpg',
  })
  @Column({ type: 'varchar', length: 1000 })
  imageUrl: string;

  @ApiProperty({
    description: 'Index of the image (e.g., 0 for front side, 1 for back side)',
    example: 0,
    minimum: 0,
  })
  @Column({ type: 'int' })
  index: number;
  @ApiProperty({
    description: 'Type of the identifier document',
    enum: IdentifierDocumentType,
    example: IdentifierDocumentType.CITIZEN_ID,
  })
  @Column({ type: 'enum', enum: IdentifierDocumentType })
  type: IdentifierDocumentType;

  @ApiProperty({
    description: 'Additional notes or description for the identifier image',
    example: 'Front side of national ID card',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @ApiProperty({
    description: 'Whether the image has been verified by admin',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'The user who owns this identifier image',
    type: () => UserVeilaModel,
  })
  @ManyToOne(() => UserVeilaModel, (user) => user.identifierImages)
  @JoinColumn({ name: 'owner_id' })
  user: UserVeilaModel;
}
