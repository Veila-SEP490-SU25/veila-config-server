import { Audit } from '@/common/models/audit.model';
import { User } from '@/common/models/user.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('profile')
export class Profile extends Audit {
  @Column({ type: 'varchar' })
  name: string;

  @Column({type: 'varchar', nullable: false})
  secret: string;

  @Column({ type: 'varchar', length: 36, nullable: false})
  userId: string;

  @ManyToOne(() => User, (user) => user.profiles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
