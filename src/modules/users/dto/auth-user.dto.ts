import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AuthUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
