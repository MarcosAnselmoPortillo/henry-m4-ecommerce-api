import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: 201,
    description: 'Categories seeded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBadRequestResponse({ description: 'Categories already exist' })
  @ApiBadRequestResponse({ description: 'Categories cannot be empty' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Error seeding categories' })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/seeder')
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['smartphone', 'MONITOR', 'Keyboard', 'Mouse'],
    },
  })
  async seedCategories(@Body() categories: string[]) {
    const newCategories = await this.categoriesService.addCategories(categories);
    return { message: 'Categories seeded', newCategories};
  }

  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Error creating category' })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.addCategory(createCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all categories successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Error getting categories' })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
}
