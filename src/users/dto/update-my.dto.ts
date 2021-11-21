import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateMyDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
  readonly password: string;

  @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(8, { message: 'Не меньше 8 символов' })
  readonly name: string;

  @ApiProperty({ example: 'Самара', description: 'Город' })
  @IsOptional()
  readonly city: string;

  @ApiProperty({ example: 'ул. Силовая 4, кв. 144', description: 'Город' })
  @IsOptional()
  readonly address: string;

  @ApiProperty({
    example: 'Необходимо звонить вечером',
    description: 'Дополнительная информация',
  })
  @IsOptional()
  readonly desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @IsOptional()
  readonly phone: string;

  @ApiProperty({
    example: '05.12.1984',
    description: 'День рождение',
  })
  @IsOptional()
  readonly birthday: Date;
}
