import { Audit } from "src/common/models/audit.model";
import { Column, Entity } from "typeorm";

@Entity('user')
export class User extends Audit{
  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;
}