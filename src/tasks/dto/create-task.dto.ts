import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  parentTask: CreateTaskDto;

  @ApiProperty()
  childTasks: CreateTaskDto[];
}
