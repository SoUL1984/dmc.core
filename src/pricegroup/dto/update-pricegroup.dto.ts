import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePriceGroupDto {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNumber({ allowInfinity: true }, { message: 'Должно быть числом' })
  //TODO:В этом параметре скорее всего нет необходимости, этот параметр не должен обновляться
  @IsOptional()
  readonly id: number;

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
