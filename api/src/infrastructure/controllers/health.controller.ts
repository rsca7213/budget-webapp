import { Controller, Get } from '@nestjs/common'

@Controller('api/health')
export class HealthController {
  @Get()
  public async healthCheck(): Promise<string> {
    return 'OK'
  }
}
