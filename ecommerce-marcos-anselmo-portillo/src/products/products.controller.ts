import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const productId = this.productsService.create(createProductDto);
    return {
      statusCode: 201,
      message: 'Product created successfully',
      productId: productId,
    };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    let product = this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productsService.update(+id, updateProductDto);
    return {
      statusCode: 200,
      message: 'Product updated successfully',
      productId: id,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productsService.remove(+id);
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      productId: id,
    }
  } 
}
