import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsDbService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly categoriesRepository: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<string> {
    const findProduct = await this.productsRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (findProduct) {
      throw new BadRequestException('Product already exists');
    }

    const category = await this.categoriesRepository.getCategoryByName(
      createProductDto.category,
    );

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.category = category;
    product.stock = createProductDto.stock;
    product.imgUrl = createProductDto.imgUrl;
    const newProduct = await this.productsRepository.save(product);
    return newProduct.id;
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    const products = await this.productsRepository.find();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    if (startIndex >= products.length) {
      return [];
    }
    return products.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: string) {
    return await this.productsRepository.delete({ id });
  }
}