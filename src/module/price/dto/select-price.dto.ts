import { IsRequired } from 'src/decorator/dto.decorator';

export class SelectPriceDto {
  @IsRequired('1', 'Индентификатор позиции в прайс-листе (id)', true)
  readonly id: number;

  @IsRequired('1', 'Индентификатор группы для прайс-листа (pricegroupId)', true)
  readonly pricegroupId: number;

  @IsRequired(
    'Абатмент циркониевый',
    'Наименование позиции в прайс-листе',
    true,
  )
  readonly name: string;

  @IsRequired('10100.10', 'Цена позиции в прайс-листе', true)
  readonly price: number;

  @IsRequired(
    'Абатмент циркониевый из материала ZOTION',
    'Дополнительная информация о позиции в прайс-листе',
    true,
  )
  readonly desc: string;

  @IsRequired('false', 'Флаг удаления позиции в прайс-листе', true)
  readonly isDelete: boolean;
}
