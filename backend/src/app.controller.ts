import { Controller, Get } from '@nestjs/common'
import { CategoryService } from './app/services/category.service'
import { UuidService } from './infrastructure/shared/services/uuid.service'

@Controller()
export class AppController {
  private readonly categoryService: CategoryService

  public constructor(private readonly uuidService: UuidService) {
    this.categoryService = new CategoryService(uuidService)
  }

  @Get()
  test(): string {
    return 'Hello World!'
  }
}
