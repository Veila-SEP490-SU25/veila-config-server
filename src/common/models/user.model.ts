import { Audit } from "@/common/models/audit.model";
import { Profile } from "@/common/models/profile.model";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('user')
export class User extends Audit{
  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @OneToMany(() => Profile, (profile) => profile.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  profiles: Profile[];
}