import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CategoryService } from '../../app/services/category.service'
import { UuidService } from '../services/uuid.service'
import { CategoryRepository } from '../database/category.repository'
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GetCategoryDto } from '../dto/categories/get-category.dto'
import { Category } from '../../domain/entities/category.entity'
import { CreateCategoryDto } from '../dto/categories/create-category.dto'
import { UpdateCategoryDto } from '../dto/categories/update-category.dto'
import { AuthUserDto } from '../dto/users/auth.dto'
import { AuthGuard } from '../guards/auth.guard'
import { AuthUser } from '../decorators/auth-user.decorator'

@Controller('api/categories')
@UseGuards(AuthGuard)
@ApiCookieAuth('auth')
@ApiTags('Category')
export class CategoryController {
  private readonly categoryService: CategoryService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly categoryRepository: CategoryRepository
  ) {
    this.categoryService = new CategoryService(uuidService, categoryRepository)
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories for auth user' })
  public async findAll(@AuthUser() auth: AuthUserDto): Promise<GetCategoryDto[]> {
    const categories: Category[] = await this.categoryService.findAll(auth.uuid)
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
  @ApiOperation({ summary: 'Get a category for auth user' })
  public async find(
    @Param('uuid') uuid: string,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCategoryDto | undefined> {
    const category = await this.categoryService.find(uuid, auth.uuid)
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
  @ApiOperation({ summary: 'Create a new category for auth user' })
  public async create(
    @Body() data: CreateCategoryDto,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCategoryDto> {
    const category = await this.categoryService.create(data.name, data.type, auth.uuid)
    return {
      uuid: category.getUuid(),
      name: category.getName(),
      type: category.getType(),
      createdAt: category.getCreatedAt().toISOString(),
      updatedAt: category.getUpdatedAt().toISOString()
    }
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update a category for auth user' })
  public async update(
    @Param('uuid') uuid: string,
    @Body() data: UpdateCategoryDto,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCategoryDto> {
    const category = (await this.categoryService.update(
      uuid,
      data.name,
      data.type,
      auth.uuid
    )) as Category
    return {
      uuid: category.getUuid(),
      name: category.getName(),
      type: category.getType(),
      createdAt: category.getCreatedAt().toISOString(),
      updatedAt: category.getUpdatedAt().toISOString()
    }
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a category for auth user' })
  public async delete(@Param('uuid') uuid: string, @AuthUser() auth: AuthUserDto): Promise<void> {
    await this.categoryService.delete(uuid, auth.uuid)
  }
}
