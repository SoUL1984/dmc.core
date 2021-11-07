import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({ example: 'Силовая ул., д. 4, кв. 144', description: 'Адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly city: string;

  @ApiProperty({ example: 'Самара', description: 'Город' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly address: string;

  @ApiProperty({
    example: 'Привозить только вовремя',
    description: 'Дополнительное описание',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @IsString({ message: 'Должно быть строкой' })
  readonly phone: string;

  @ApiProperty({
    example: '05.12.1984',
    description: 'День рождение',
  })
  @IsOptional()
  readonly birthday: Date;
  //@isDateString({ message: 'Должно быть датой' })
  //TODO: разобраться с проверкой данных
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
