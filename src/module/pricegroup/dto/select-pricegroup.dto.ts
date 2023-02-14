import { IsRequired } from 'src/decorator/dto.decorator';

export class SelectPriceGroupDto {
  @IsRequired('1', 'id', true)
  readonly id: number;

  @IsRequired('Цирконий', 'Название группы для прайс-листа', true)
  readonly pricegroup_name: string;

  @IsRequired(
    'Группа где находятся позиции по цирконию',
    'Дополнительное описание группы прайс-лист',
    true,
  )
  readonly pricegroup_desc: string;

  @IsRequired('false', 'Флаг удаления Заказ-наряда', true)
  readonly isDelete: boolean;
}
