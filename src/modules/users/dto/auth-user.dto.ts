import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AuthUserDto extends PartialType(CreateUserDto) {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
