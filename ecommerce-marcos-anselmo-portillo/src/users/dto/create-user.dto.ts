import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    example: 'mail@example.com',
    description: 'User email',
  })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    example: 'aAbB123*',
    description:
      'User password. Must contain at least one lowercase letter, one uppercase letter, a number, and one of the following special characters: !@#$%^&*',
  })
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

  @ApiProperty({
    example: 'aAbB123*',
    description:
      'User password. Must contain at least one lowercase letter, one uppercase letter, a number, and one of the following special characters: !@#$%^&*',
  })
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

  @ApiProperty({
    example: 1234567890,
    description: 'User phone number',
  })
  @IsInt()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    example: 'United States',
    description: 'User country',
  })
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  country?: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'User address',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @ApiProperty({
    example: 'New York',
    description: 'User city',
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}
