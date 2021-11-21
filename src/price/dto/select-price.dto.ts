import { ApiProperty } from '@nestjs/swagger';

export class SelectPriceDto {
  @ApiProperty({
    example: '1',
    description: 'Индентификатор позиции в прайс-листе (id)',
  })
  readonly id: number;

  @ApiProperty({
    example: '1',
    description: 'Индентификатор группы для прайс-листа (pricegroupId)',
  })
  readonly pricegroupId: number;

  @ApiProperty({
    example: 'Абатмент циркониевый',
    description: 'Наименование позиции в прайс-листе',
  })
  readonly name: string;

  @ApiProperty({
    example: '10100.10',
    description: 'Цена позиции в прайс-листе',
  })
  readonly price: number;

  @ApiProperty({
    example: 'Абатмент циркониевый из материала ZOTION',
    description: 'Дополнительная информация о позиции в прайс-листе',
  })
  readonly desc: string;

  @ApiProperty({
    example: 'false',
    description: 'Флаг удаления позиции в прайс-листе',
  })
  readonly isDelete: boolean;
}
