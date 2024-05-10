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
import * as fs from 'fs';
import { formatString } from 'src/utils/formatStrings';

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
      formatString(createProductDto.category),
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
    const products = await this.productsRepository.find({
      relations: { category: true },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    if (startIndex >= products.length) {
      return [];
    }   
    return products.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
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

  async loadProducts() {
    const dataFile = 'src/data/ecommerce-products.json';
    const rawData = fs.readFileSync(dataFile, 'utf8');
    const data = JSON.parse(rawData);
    const response = { 
      productsAlreadyExists: [],
      productsCreated: [],
      productsWithoutExistingCategory: [],
    }

    for (const product of data) {
      product.name = formatString(product.name);
      const findProduct = await this.productsRepository.findOne({
        where: { name: product.name },
      });

      if (!findProduct) {
        const category = await this.categoriesRepository.getCategoryByName(
          formatString(product.category),
        );

        if (category) {
          const newProduct = new Product();
          newProduct.name = product.name;
          newProduct.description = product.description;
          newProduct.price = product.price;
          newProduct.stock = product.stock;
          newProduct.imgUrl = product.imgUrl;
          newProduct.category = category;
          const newProductCreated = await this.productsRepository.save(newProduct);
          response.productsCreated.push(newProductCreated);
        } else {
          response.productsWithoutExistingCategory.push({product: product.name, category:product.category});
        }
      } else {
        response.productsAlreadyExists.push(product.name);
      }
    } 
    return response;
  }
}
