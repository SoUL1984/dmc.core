import { IsString, MinLength } from 'class-validator';
import { IsRequired } from '../../../decorator/dto.decorator';

export class CreatePriceGroupDto {
  @IsRequired('Цирконий', 'Название группы для прайс-листа', true)
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(5, { message: 'Не меньше 5 символов' })
  readonly pricegroup_name: string;

  @IsRequired(
    'Группа где находятся позиции по цирконию',
    'Дполнительное описание группы прайс-лист',
    false,
  )
  @IsString({ message: 'Должно быть строкой' })
  readonly pricegroup_desc: string;
}
