import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ValidateNested} from "class-validator"

class ProductDto {
    @IsUUID()
    id: string;
  }
  
  export class CreateOrderDto {
    @IsUUID()
    userId: string;
  
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true }) // validate each item in array
    @Type(() => ProductDto) // to indicate that each item in array is an instance of ProductDto
    products: ProductDto[];
  }