import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

class ProductDto {
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'Product ID',
  })
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'User ID',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Products',
    type: [ProductDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // validate each item in array
  @Type(() => ProductDto) // to indicate that each item in array is an instance of ProductDto
  products: ProductDto[];
}