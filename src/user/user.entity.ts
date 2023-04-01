import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  hasAdmin: boolean;
}
