import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../db/base-entity';
import { EpicEntity } from '../../epics/entities/epic.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => EpicEntity, (epic) => epic.user)
  @JoinColumn()
  epics: EpicEntity[];
}
