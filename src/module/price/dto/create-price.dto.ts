import { IsNumber, IsString } from 'class-validator';
import { IsRequired } from 'src/decorator/dto.decorator';

export class CreatePriceDto {
  @IsRequired('1', 'Индентификатор группы для прайс-листа (pricegroupId)', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly pricegroupId: number;

  @IsRequired(
    'Абатмент циркониевый',
    'Наименование позиции в прайс-листе',
    true,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsRequired('10100.10', 'Цена позиции в прайс-листе', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly price: number;

  @IsRequired(
    'Абатмент циркониевый из материала ZOTION',
    'Дополнительная информация о позиции в прайс-листе',
    false,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly desc: string;
}
