import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { formatStrings, formatString } from '../utils/formatStrings';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryFormatted = formatString(createCategoryDto.name);
    const categoryExists = await this.getCategoryByName(categoryFormatted);

    if (categoryExists) {
      throw new BadRequestException(`Category ${categoryFormatted} already exists`);
    }
    const category = new Category();
    category.name = categoryFormatted;
    return await this.categoriesRepository.save(category);
  }
  async addCategories(categories: string[]): Promise<Category[]> {
    if (categories.length === 0) {
      throw new BadRequestException('Categories cannot be empty');
    }

    const categoriesFormatted = formatStrings(categories);
    const categoriesExists = await this.getCategories();
    const categoriesToAdd = categoriesFormatted.filter(
      (category) => !categoriesExists.find((cat) => cat.name === category),
    );
    if (categoriesToAdd.length === 0) {
      throw new BadRequestException('Categories already exist');
    }

    const categoriesToSave = categoriesToAdd.map((name) => {
      const category = new Category();
      category.name = name;
      return category;
    });

    return await this.categoriesRepository.save(categoriesToSave);
  }

  async getCategoryByName(name: string): Promise<Category> {
    return await this.categoriesRepository.findOne({ where: { name } });
  }
}
