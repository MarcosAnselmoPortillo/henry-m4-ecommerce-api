import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product price',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    example: 'https://example.com/default-image.jpg',
    description: 'Product image url',
    default: 'https://example.com/default-image.jpg',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  imgUrl?: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Product category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
