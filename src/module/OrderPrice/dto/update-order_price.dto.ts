import { ApiProperty } from '@nestjs/swagger';
import { IsRequired } from '../../../decorator/dto.decorator';

export class UpdateOrderPriceDto {
  @IsRequired('10', 'Количество', true)
  readonly amount: number;

  @IsRequired('1100', 'Текущая цена', true)
  readonly tprice: number;
}
