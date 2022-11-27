import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { EpicEntity } from '../epics/entities/epic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, EpicEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
