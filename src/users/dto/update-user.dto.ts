import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
  readonly password: string;

  @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(8, { message: 'Не меньше 8 символов' })
  readonly name: string;

  @ApiProperty({ example: 'Самара', description: 'Город' })
  readonly city: string;

  @ApiProperty({ example: 'ул. Силовая 4, кв. 144', description: 'Город' })
  readonly address: string;

  @ApiProperty({
    example: 'Необходимо звонить вечером',
    description: 'Дополнительная информация',
  })
  readonly desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  readonly phone: string;

  @ApiProperty({ example: 'Customer', description: 'Роль' })
  readonly role: string;
}
