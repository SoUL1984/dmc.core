import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({ example: 'Белов А.А.', description: 'ФИО доктора' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly doctorName: string;

  @ApiPropertyOptional({ example: 'Иванов И. И.', description: 'ФИО пациента' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly pacientName: string;

  @ApiPropertyOptional({
    example: 'Макаров Е.В.',
    description: 'ФИО техника',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @ApiPropertyOptional({ example: 'А1', description: 'Цвет конструкции' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly color: string;

  @ApiPropertyOptional({
    example: '10.01.2021',
    description: 'Дата сдачи работы (окончательная, которая произошла)',
  })
  @IsOptional()
  readonly deliveryWork: Date;

  @ApiPropertyOptional({
    example: 'TODO:Написать верное значение',
    description: 'Акт выполненных работ',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly certComplete: string;

  @ApiPropertyOptional({
    example: 'TODO:Написать верное значение',
    description: 'Факт оплаты (подтверждение оплаты)',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly factPayment: string;

  @ApiPropertyOptional({ example: 'true', description: 'Флаг, работа сдана' })
  @IsOptional()
  @IsBoolean()
  readonly isComplete: boolean;

  @ApiPropertyOptional({ example: 'true', description: 'Флаг, оплаты работы' })
  @IsOptional()
  @IsBoolean()
  readonly isPayment: boolean;

  @ApiPropertyOptional({
    example: 'false',
    description: 'Флаг, работу можно отправить',
  })
  @IsOptional()
  @IsBoolean()
  readonly isDelivery: boolean;

  @ApiPropertyOptional({
    example: 'false',
    description: 'Флаг, доставка произведена',
  })
  @IsOptional()
  @IsBoolean()
  readonly isDeliveryMade: boolean;

  @ApiPropertyOptional({
    example: 'TODO:Пока не знаю как и что',
    description:
      'Прикрпеленные файлы (закешированный фал и путь к нему) TODO:Продумать это',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly uploadFiles: string;

  @ApiPropertyOptional({
    example: 'Данный заказ-наряд не обязательно делать срочно',
    description: 'Дополнительные комментарии',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly desc: string;

  @ApiPropertyOptional({
    example: 'Код домофона 07112021',
    description: 'Коментарий для курьера',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  descCourier: string;

  @ApiProperty({
    example: '3',
    description: 'Первый исполнитель',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n1: number;

  @ApiPropertyOptional({
    example: '2',
    description: 'Второй исполнитель',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n2: number;

  @ApiPropertyOptional({
    example: '1',
    description: 'Третий исполнитель',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n3: number;

  @ApiPropertyOptional({
    example: '05.12.1984',
    description: 'Дата первой примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN1: Date;

  @ApiPropertyOptional({
    example: '05.12.1984',
    description: 'Дата второй примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN2: Date;

  @ApiPropertyOptional({
    example: '05.12.1984',
    description: 'Дата третьей примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN3: Date;
}
