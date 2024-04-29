import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/seeder')
  async seedCategories(@Body() categories: string[]) {
    await this.categoriesService.addCategories(categories);
    return { message: 'Categories seeded' };
  }

  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.addCategory(createCategoryDto);
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
}
