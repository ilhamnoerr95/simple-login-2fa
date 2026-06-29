import { Type } from 'class-transformer';

import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
