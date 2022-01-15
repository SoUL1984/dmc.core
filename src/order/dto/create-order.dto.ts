import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: '10100.10',
    description: 'Цена позиции в прайс-листе',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly technician: string;

  @ApiProperty({
    example: 'Абатмент циркониевый',
    description: 'Наименование позиции в прайс-листе',
  })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly executor_n1: number;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата примерки',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly fittingDateN1: Date;

  @ApiProperty({
    example: 'TODO:Пока не знаю как и что',
    description:
      'Прикрпеленные файлы (закешированный фал и путь к нему) TODO:Продумать это',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly uploadFiles: string;
}
