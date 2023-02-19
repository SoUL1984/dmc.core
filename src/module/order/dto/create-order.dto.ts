import { IsNumber, IsString } from 'class-validator';
import { IsRequired } from '../../../decorator/dto.decorator';

export class CreateOrderDto {
  @IsRequired('Белов А.А.', 'ФИО доктора', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly doctorName: string;

  @IsRequired('Иванов И. И.', 'ФИО пациента', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly pacientName: string;

  @IsRequired('Макаров Е.В.', 'ФИО техника', true)
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @IsRequired('А1', 'Цвет конструкции', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly color: string;

  @IsRequired(
    'TODO:Пока не знаю как и что',
    'Прикрпеленные файлы (закешированный фал и путь к нему) TODO:Продумать это',
    false,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly uploadFiles: string;

  @IsRequired(
    'Данный заказ-наряд не обязательно делать срочно',
    'Дополнительные комментарии',
    false,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly desc: string;

  @IsRequired('Код домофона 07112021', 'Коментарий для курьера', false)
  @IsString({ message: 'Должно быть строкой' })
  descCourier: string;

  @IsRequired('3', 'Первый исполнитель', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n1: number;

  @IsRequired('2', 'Второй исполнитель', false)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n2: number;

  @IsRequired('1', 'Третий исполнитель', false)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n3: number;

  @IsRequired('05.12.1984', 'Дата первой примерки', true)
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN1: Date;

  @IsRequired('05.12.1984', 'Дата второй примерки', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN2: Date;

  @IsRequired('05.12.1984', 'Дата третьей примерки', false)
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN3: Date;
}
