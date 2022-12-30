import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { UserRole } from './../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: UserRole;
}
