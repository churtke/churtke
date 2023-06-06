import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role/role.enum';
import { File } from 'src/file/file.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: Role.Customer })
  role: Role;

  @OneToMany(() => File, (file) => file.createdBy)
  files: File[];
}
