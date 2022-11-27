import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmpty()
  parentTask: CreateTaskDto;

  @ApiProperty()
  @IsEmpty()
  childTasks: CreateTaskDto[];
}
