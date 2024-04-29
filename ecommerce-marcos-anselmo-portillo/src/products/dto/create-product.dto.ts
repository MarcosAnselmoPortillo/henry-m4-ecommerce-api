import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength, IsDecimal, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })	
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}