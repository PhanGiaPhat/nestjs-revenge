import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../db/base-entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('epics')
export class EpicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.epics, { cascade: true })
  @JoinColumn()
  user: UserEntity;
}
