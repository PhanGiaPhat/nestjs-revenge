import { Module } from '@nestjs/common';
import { EpicsService } from './epics.service';
import { EpicsController } from './epics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpicEntity } from './entities/epic.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpicEntity, UserEntity])],
  controllers: [EpicsController],
  providers: [EpicsService],
})
export class EpicsModule {}
