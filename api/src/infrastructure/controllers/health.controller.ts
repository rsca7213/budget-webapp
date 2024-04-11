import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('api/health')
@ApiTags('API Runtime')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  public async healthCheck(): Promise<string> {
    return 'OK'
  }
}
