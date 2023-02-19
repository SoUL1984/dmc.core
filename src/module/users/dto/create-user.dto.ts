import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { IsRequired } from '../../../decorator/dto.decorator';

export class CreateUserDto {
  @IsRequired('user@mail.ru', 'Почта', true)
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsRequired('volk', 'Пароль', true)
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
  readonly password: string;

  @IsRequired('Пащенко Э.В.', 'ФИО пользователя', true)
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(8, { message: 'Не меньше 8 символов' })
  readonly name: string;

  @IsRequired('Самара', 'Адрес', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly city: string;

  @IsRequired('Силовая ул., д. 4, кв. 144', 'Город', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly address: string;

  @IsRequired('Привозить только вовремя', 'Дополнительное описание', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly desc: string;

  @IsRequired('+7 (987) 787-80-76', 'Телефон', true)
  @IsString({ message: 'Должно быть строкой' })
  readonly phone: string;

  @IsRequired('1956-05-11', 'День рождение', false)
  readonly birthday: Date;
  //@isDateString({ message: 'Должно быть датой' })
  //TODO: разобраться с проверкой данных
}

export class AuthUserDto {
  @IsRequired('Baranov@yandex.ru', 'Почта', true)
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsRequired('volk', 'Пароль', true)
  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
