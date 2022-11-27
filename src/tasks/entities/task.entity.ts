import { EpicEntity } from 'src/epics/entities/epic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../db/base-entity';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @ManyToOne(() => EpicEntity, (epic) => epic.tasks, { cascade: true })
  @JoinColumn()
  epic: EpicEntity;
}
