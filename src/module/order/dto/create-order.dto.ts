import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ example: 'Белов А.А.', description: 'ФИО доктора' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly doctorName: string;

  @ApiPropertyOptional({ example: 'Иванов И. И.', description: 'ФИО пациента' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly pacientName: string;

  @ApiProperty({
    example: 'Макаров Е.В.',
    description: 'ФИО техника',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @ApiPropertyOptional({ example: 'А1', description: 'Цвет конструкции' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly color: string;

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

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата первой примерки',
  })
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
