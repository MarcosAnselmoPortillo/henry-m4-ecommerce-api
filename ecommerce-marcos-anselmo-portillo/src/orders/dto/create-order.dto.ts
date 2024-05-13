import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsArray, ArrayMinSize, ValidateNested, ValidationArguments } from 'class-validator';

class ProductDto {
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'Product ID',
  })
  @IsUUID( undefined, {
    message: (validationArguments: ValidationArguments) => {
      return `Product ID ${validationArguments.value} is not valid`;
    }
  })
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
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}