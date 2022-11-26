import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEpicDto {
  @ApiProperty()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
