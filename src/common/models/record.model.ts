import { Audit } from '@/common/models/audit.model';
import { Profile } from '@/common/models/profile.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('record')
export class Record extends Audit {
  @Column({ type: 'varchar', nullable: false })
  key: string;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @Column({ type: 'uuid', nullable: false })
  profileId: string;

  @ManyToOne(() => Profile, (profile) => profile.records)
  profile: Profile;
}
