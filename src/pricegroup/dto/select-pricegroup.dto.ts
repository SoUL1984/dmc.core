import { ApiProperty } from '@nestjs/swagger';

export class SelectPriceGroupDto {
  @ApiProperty({ example: '1', description: 'id' })
  readonly id: number;

  @ApiProperty({
    example: 'Цирконий',
    description: 'Название группы для прайс-листа',
  })
  readonly pricegroup_name: string;

  @ApiProperty({
    example: 'Группа где находятся позиции по цирконию',
    description: 'Дполнительное описание группы прайс-лист',
  })
  readonly pricegroup_desc: string;

  @ApiProperty({
    example: 'false',
    description: 'Флаг удаления Заказ-наряда',
  })
  readonly isDelete: boolean;
}
