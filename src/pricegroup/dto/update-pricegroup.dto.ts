import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePriceGroupDto {
  @ApiProperty({
    example: 'Цирконий',
    description: 'Название группы для прайс-листа',
  })
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(5, { message: 'Не меньше 5 символов' })
  @IsOptional()
  readonly pricegroup_name: string;

  @ApiProperty({
    example: 'Группа где находятся позиции по цирконию',
    description: 'Дполнительное описание группы прайс-лист',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly pricegroup_desc: string;
}
