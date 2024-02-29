import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryService } from '../../app/services/category.service'
import { UuidService } from '../services/uuid.service'
import { CategoryRepository } from '../database/category.repository'
import { ExceptionMapper } from '../mappers/exception.mapper'
import { ApiTags } from '@nestjs/swagger'
import { GetCategoryDto } from '../dto/get-category.dto'
import { Category } from '../../domain/entities/category.entity'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'

@Controller('api/category')
export class CategoryController {
  private readonly categoryService: CategoryService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly categoryRepository: CategoryRepository,
    private readonly exceptionMapper: ExceptionMapper
  ) {
    this.categoryService = new CategoryService(uuidService, categoryRepository)
  }

  @Get()
  @ApiTags('Category')
  public async findAll(): Promise<GetCategoryDto[]> {
    let categories: Category[] = []
    try {
      categories = await this.categoryService.findAll()
      return categories.map(category => {
        return {
          uuid: category.getUuid(),
          name: category.getName(),
          type: category.getType()
        }
      })
    } catch (error) {
      this.exceptionMapper.map(error)
    }

    return []
  }

  @Get(':uuid')
  @ApiTags('Category')
  public async find(@Param('uuid') uuid: string): Promise<GetCategoryDto | void> {
    let category: Category | void
    try {
      category = await this.categoryService.find(uuid)
      if (!category) return
      return {
        uuid: category.getUuid(),
        name: category.getName(),
        type: category.getType()
      }
    } catch (error) {
      this.exceptionMapper.map(error)
    }
  }

  @Post('')
  @ApiTags('Category')
  public async create(@Body() data: CreateCategoryDto): Promise<void> {
    try {
      await this.categoryService.create(data.name, data.type)
    } catch (error) {
      this.exceptionMapper.map(error)
    }
  }

  @Put(':uuid')
  @ApiTags('Category')
  public async update(@Param('uuid') uuid: string, @Body() data: UpdateCategoryDto): Promise<void> {
    try {
      await this.categoryService.update(uuid, data.name, data.type)
    } catch (error) {
      this.exceptionMapper.map(error)
    }
  }

  @Delete(':uuid')
  @ApiTags('Category')
  public async delete(@Param('uuid') uuid: string): Promise<void> {
    try {
      await this.categoryService.delete(uuid)
    } catch (error) {
      this.exceptionMapper.map(error)
    }
  }
}
