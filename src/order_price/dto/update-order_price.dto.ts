import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderPriceDto {
  @ApiProperty({
    example: '10',
    description: 'Количество',
  })
  readonly amount: number;

  @ApiProperty({
    example: '1100',
    description: 'Текущая цена',
  })
  readonly tprice: number;
}
