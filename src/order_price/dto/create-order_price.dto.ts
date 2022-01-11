import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderPriceDto {
  @ApiProperty({
    example: '10',
    description: 'Индентификатор прайс-листа (priceId)',
  })
  readonly priceId: number;

  @ApiProperty({
    example: '10',
    description: 'Индентификатор заказ-наряда (orderId)',
  })
  readonly orderId: number;

  @ApiProperty({
    example: '10',
    description: 'Количество',
  })
  readonly amount: number;
}
