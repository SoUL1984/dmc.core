import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { IsRequired } from '../../../decorator/dto.decorator';

export class UpdateMyDto {
  @IsRequired('user@mail.ru', 'Почта', false)
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsRequired('12345678', 'Пароль', false)
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
  readonly password: string;

  @IsRequired('Пащенко Э.В.', 'ФИО пользователя', false)
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(8, { message: 'Не меньше 8 символов' })
  readonly name: string;

  @IsRequired('Самара', 'Город', false)
  readonly city: string;

  @IsRequired('ул. Силовая 4, кв. 144', 'Город', false)
  readonly address: string;

  @IsRequired('Необходимо звонить вечером', 'Дополнительная информация', false)
  readonly desc: string;

  @IsRequired('+7 (123) 456-78-90', 'Телефон', false)
  readonly phone: string;

  @IsRequired('05.12.1984', 'День рождение', false)
  readonly birthday: Date;
}
