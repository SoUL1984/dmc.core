import { IsNumber, IsString, MinLength } from 'class-validator';
import { IsRequired } from 'src/decorator/dto.decorator';

export class UpdatePriceDto {
  @IsRequired(
    '1',
    'Индентификатор группы для прайс-листа (pricegroupId)',
    false,
  )
  @IsNumber({}, { message: 'Должно быть числом' })
  @MinLength(5, { message: 'Не меньше 5 символов' })
  readonly pricegroupId: number;

  @IsRequired(
    'Абатмент циркониевый',
    'Наименование позиции в прайс-листе',
    false,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsRequired('10100.10', 'Цена позиции в прайс-листе', false)
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
