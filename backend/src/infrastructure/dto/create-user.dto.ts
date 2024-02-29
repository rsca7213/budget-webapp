import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string

  @ApiProperty({ example: 'johndoe@email.com' })
  email: string

  @ApiProperty({ example: 'Password123*' })
  password: string
}
