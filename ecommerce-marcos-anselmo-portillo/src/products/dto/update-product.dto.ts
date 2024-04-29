import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength, IsDecimal, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
