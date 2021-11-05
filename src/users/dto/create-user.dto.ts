import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
  readonly password: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @IsString({ message: 'Должно быть строкой' })
  readonly phone: string;

  @ApiProperty({ example: 'guest', description: 'Роль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly role: string;
}

export class AuthUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
