import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryService } from '../../app/services/category.service'
import { UuidService } from '../services/uuid.service'
import { CategoryRepository } from '../database/category.repository'
import { ApiTags } from '@nestjs/swagger'
import { GetCategoryDto } from '../dto/categories/get-category.dto'
import { Category } from '../../domain/entities/category.entity'
import { CreateCategoryDto } from '../dto/categories/create-category.dto'
import { UpdateCategoryDto } from '../dto/categories/update-category.dto'

@Controller('api/categories')
export class CategoryController {
  private readonly categoryService: CategoryService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly categoryRepository: CategoryRepository
  ) {
    this.categoryService = new CategoryService(uuidService, categoryRepository)
  }

  @Get()
  @ApiTags('Category')
  public async findAll(): Promise<GetCategoryDto[]> {
    let categories: Category[] = await this.categoryService.findAll()
    return categories.map(category => {
      return {
        uuid: category.getUuid(),
        name: category.getName(),
        type: category.getType(),
        createdAt: category.getCreatedAt().toISOString(),
        updatedAt: category.getUpdatedAt().toISOString()
      }
    })
  }

  @Get(':uuid')
  @ApiTags('Category')
  public async find(@Param('uuid') uuid: string): Promise<GetCategoryDto | void> {
    let category = await this.categoryService.find(uuid)
    if (!category) return
    return {
      uuid: category.getUuid(),
      name: category.getName(),
      type: category.getType(),
      createdAt: category.getCreatedAt().toISOString(),
      updatedAt: category.getUpdatedAt().toISOString()
    }
  }

  @Post('')
  @ApiTags('Category')
  public async create(@Body() data: CreateCategoryDto): Promise<void> {
    await this.categoryService.create(data.name, data.type)
  }

  @Put(':uuid')
  @ApiTags('Category')
  public async update(@Param('uuid') uuid: string, @Body() data: UpdateCategoryDto): Promise<void> {
    await this.categoryService.update(uuid, data.name, data.type)
  }

  @Delete(':uuid')
  @ApiTags('Category')
  public async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.categoryService.delete(uuid)
  }
}
