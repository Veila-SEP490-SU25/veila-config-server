import { Audit } from './audit.model';
import { Record } from './record.model';
import { User } from './user.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('profile')
export class Profile extends Audit {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  secret: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.profiles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Record, (record) => record.profile)
  records: Record[];
}
