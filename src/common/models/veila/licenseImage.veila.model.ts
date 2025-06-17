import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base.veila.model';
import { LicenseVeilaModel } from './license.veila.model';

@Entity({ name: 'license_images' })
export class LicenseImageVeilaModel extends BaseModel {
  @ApiProperty({
    description: 'URL of the license document image',
    example: 'https://storage.example.com/licenses/shop123/images/page1.jpg',
  })
  @Column({ type: 'varchar', length: 1000 })
  imageUrl: string;

  @ApiProperty({
    description: 'Index of the image in the document (for multiple pages)',
    example: 0,
    minimum: 0,
  })
  @Column({ type: 'int' })
  index: number;

  @ApiProperty({
    description: 'Optional description or note for this image',
    example: 'Front page of business license',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Original file name of the uploaded image',
    example: 'business-license-page1.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  originalFileName?: string;

  @ApiProperty({
    description: 'The license this image belongs to',
    type: () => LicenseVeilaModel,
  })
  @ManyToOne(() => LicenseVeilaModel, (license) => license.licenseImages)
  @JoinColumn({ name: 'license_id' })
  license: LicenseVeilaModel;
}
