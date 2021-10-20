import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  readonly phone: string;

  @ApiProperty({ example: 'guest', description: 'Роль' })
  readonly role: number;
}
