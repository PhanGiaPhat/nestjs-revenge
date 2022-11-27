import { TaskEntity } from '../../tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => TaskEntity, (task) => task.epic)
  @JoinColumn()
  tasks: TaskEntity[];
}
