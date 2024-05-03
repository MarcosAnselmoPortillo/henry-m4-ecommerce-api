import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
  UseGuards,
  InternalServerErrorException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsDbService } from './productsDb.service';
import { Product } from './entities/product.entity';
import { BadRequestException } from '@nestjs/common';
import { validate as isValidUuid } from 'uuid';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsDbService: ProductsDbService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const productId = await this.productsDbService.create(createProductDto);
      return {
        statusCode: 201,
        message: 'Product created successfully',
        productId: productId,
      };
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error creating product');
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Product[]> {
    return await this.productsDbService.findAll(+page, +limit);
  }

  @Get('/seeder')
  async seedProducts() {
    await this.productsDbService.loadProducts();
    return { message: 'Products seeded' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    if (!isValidUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const product = await this.productsDbService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (!updateProductDto) {
      throw new BadRequestException('Missing update product data');
    }
    try {
      let product = await this.productsDbService.findOne(id);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      await this.productsDbService.update(id, updateProductDto);
      return {
        statusCode: 200,
        message: 'Product updated successfully',
        productId: id,
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error updating user');
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const product = this.productsDbService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productsDbService.remove(id);
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      productId: id,
    };
  }
}
