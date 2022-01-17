import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: 'Белов А.А.', description: 'ФИО доктора' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly doctorName: string;

  @ApiProperty({ example: 'Иванов И. И.', description: 'ФИО пациента' })
  @IsOptional() 
  @IsString({ message: 'Должно быть строкой' })
  readonly pacientName: string;

  @ApiProperty({
    example: 'Макаров Е.В.',
    description: 'ФИО техника',
  })
  @IsOptional()  
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @ApiProperty({ example: 'А1', description: 'Цвет конструкции' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly color: string;

  @ApiProperty({
    example: '10.01.2021',
    description: 'Дата сдачи работы (окончательная, которая произошла)',
  })
  @IsOptional()
  readonly deliveryWork: Date;

  @ApiProperty({
    example: 'TODO:Написать верное значение',
    description: 'Акт выполненных работ',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly certComplete: string;

  @ApiProperty({
    example: 'TODO:Написать верное значение',
    description: 'Факт оплаты (подтверждение оплаты)',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly factPayment: string;

  @ApiProperty({ example: 'true', description: 'Флаг, работа сдана' })
  @IsOptional()
  @IsBoolean()
  readonly isComplete: boolean;

  @ApiProperty({ example: 'true', description: 'Флаг, оплаты работы' })
  @IsOptional()
  @IsBoolean()
  readonly isPayment: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Флаг, работу можно отправить',
  })
  @IsOptional()
  @IsBoolean()
  readonly isDelivery: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Флаг, доставка произведена',
  })
  @IsOptional()
  @IsBoolean()
  readonly isDeliveryMade: boolean;

  @ApiProperty({
    example: 'TODO:Пока не знаю как и что',
    description:
      'Прикрпеленные файлы (закешированный фал и путь к нему) TODO:Продумать это',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly uploadFiles: string;

  @ApiProperty({
    example: 'Данный заказ-наряд не обязательно делать срочно',
    description: 'Дополнительные комментарии',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly desc: string;

  @ApiProperty({
    example: 'Код домофона 07112021',
    description: 'Коментарий для курьера',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  descCourier: string;

  @ApiProperty({
    example: '3',
    description: 'Первый исполнитель',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly executor_n1: number;

  @ApiProperty({
    example: '2',
    description: 'Второй исполнитель',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsOptional()
  readonly executor_n2: number;

  @ApiProperty({
    example: '1',
    description: 'Третий исполнитель',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsOptional()
  readonly executor_n3: number;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата первой примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN1: Date;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата второй примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN2: Date;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата третьей примерки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN3: Date;
}
