import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePriceDto {
  @ApiProperty({
    example: '1',
    description: 'Индентификатор группы для прайс-листа (pricegroupId)',
  })
  @IsNumber({ allowInfinity: true }, { message: 'Должно быть числом' })
  @MinLength(5, { message: 'Не меньше 5 символов' })
  @IsOptional()
  readonly pricegroupId: number;

  @ApiProperty({
    example: 'Абатмент циркониевый',
    description: 'Наименование позиции в прайс-листе',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    example: '10100.10',
    description: 'Цена позиции в прайс-листе',
  })
  @IsNumber({}, { message: 'Должно быть строкой' })
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    example: 'Абатмент циркониевый из материала ZOTION',
    description: 'Дополнительная информация о позиции в прайс-листе',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly desc: string;
}
