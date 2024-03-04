import { ApiProperty } from '@nestjs/swagger'

export class VerifyUserCredentialsDto {
  @ApiProperty({ example: 'user@email.com' })
  email: string

  @ApiProperty({ example: 'Password123*' })
  password: string
}
