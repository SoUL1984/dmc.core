import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Белов А.А.', description: 'ФИО доктора' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly doctorName: string;

  @ApiProperty({ example: 'Иванов И. И.', description: 'ФИО пациента' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly pacientName: string;

  @ApiProperty({
    example: 'Макаров Е.В.',
    description: 'ФИО техника',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @ApiProperty({ example: 'А1', description: 'Цвет конструкции' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly color: string;

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
