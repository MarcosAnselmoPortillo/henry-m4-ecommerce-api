import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsInt,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, a number, and one of the following special characters: !@#$%^&*',
    },
  )
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, a number, and one of the following special characters: !@#$%^&*',
    },
  )
  confirmPassword?: string;

  @IsInt()
  @IsNotEmpty()
  phone?: number;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  country?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}